import { Injectable } from "@nestjs/common"
import type { PrismaService } from "../prisma/prisma.service"
import * as admin from "firebase-admin"
import nodemailer from "nodemailer"

@Injectable()
export class NotificationsService {
  private emailTransporter: nodemailer.Transporter

  constructor(private prisma: PrismaService) {
    // Initialize email transporter (using Gmail SMTP - free)
    this.emailTransporter = nodemailer.createTransporter({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD, // Use App Password, not regular password
      },
    })
  }

  async sendWalkInvitation(recipientId: number, senderUsername: string, walkLocation: string) {
    // Get user's FCM token and email
    const user = await this.prisma.user.findUnique({
      where: { id: recipientId },
      select: { fcmToken: true, email: true },
    })

    if (user?.fcmToken) {
      const message = {
        token: user.fcmToken,
        notification: {
          title: "Walk Invitation",
          body: `${senderUsername} invited you to walk at ${walkLocation}`,
        },
        data: {
          type: "walk_invitation",
          senderId: recipientId.toString(),
        },
      }

      try {
        await admin.messaging().send(message)
      } catch (error) {
        console.error("Failed to send push notification:", error)
      }
    }

    // Fallback to email notification
    if (user?.email) {
      try {
        await this.emailTransporter.sendMail({
          from: process.env.GMAIL_USER,
          to: user.email,
          subject: "Walk Invitation - Walk With Me",
          html: `
            <h2>You've been invited to walk!</h2>
            <p><strong>${senderUsername}</strong> has invited you to join a walk at <strong>${walkLocation}</strong>.</p>
            <p>Open the Walk With Me app to accept or decline this invitation.</p>
            <br>
            <p>Happy walking!</p>
            <p>The Walk With Me Team</p>
          `,
        })
      } catch (error) {
        console.error("Failed to send email notification:", error)
      }
    }
  }

  async sendEmergencyAlert(userId: number, latitude: number, longitude: number) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        emergencyContact: true,
      },
    })

    if (user?.emergencyContact) {
      const locationUrl = `https://maps.google.com/?q=${latitude},${longitude}`

      // Method 1: Email to emergency contact (if they provided email)
      if (user.emergencyContact.email) {
        try {
          await this.emailTransporter.sendMail({
            from: process.env.GMAIL_USER,
            to: user.emergencyContact.email,
            subject: "🚨 EMERGENCY ALERT - Walk With Me",
            html: `
              <h1 style="color: red;">🚨 EMERGENCY ALERT</h1>
              <p><strong>${user.username}</strong> has triggered an emergency alert during their walk.</p>
              <p><strong>Location:</strong> <a href="${locationUrl}" target="_blank">View on Google Maps</a></p>
              <p><strong>Coordinates:</strong> ${latitude}, ${longitude}</p>
              <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
              <br>
              <p style="color: red; font-weight: bold;">Please check on them immediately or contact local emergency services if needed.</p>
            `,
          })
        } catch (error) {
          console.error("Failed to send emergency email:", error)
        }
      }

      // Method 2: Use a free SMS service like TextBelt (limited free messages)
      if (user.emergencyContact.phoneNumber) {
        try {
          const message = `🚨 EMERGENCY: ${user.username} needs help! Location: ${locationUrl}`

          // Using TextBelt free SMS service (1 free message per day per phone number)
          const response = await fetch("https://textbelt.com/text", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              phone: user.emergencyContact.phoneNumber,
              message: message,
              key: "textbelt", // Use 'textbelt' for free tier
            }),
          })

          const result = await response.json()
          if (!result.success) {
            console.error("TextBelt SMS failed:", result.error)
            throw new Error(result.error)
          }
        } catch (error) {
          console.error("Failed to send emergency SMS:", error)

          // Fallback: Try alternative free SMS service (SMSGateway24)
          try {
            await this.sendSMSViaAlternative(
              user.emergencyContact.phoneNumber,
              `🚨 EMERGENCY: ${user.username} needs help! Location: ${locationUrl}`,
            )
          } catch (altError) {
            console.error("All SMS services failed:", altError)
            throw new Error("Failed to send emergency alert via SMS")
          }
        }
      }

      // Method 3: Browser notification if user is online
      await this.sendBrowserNotification(user.emergencyContact.userId, {
        title: "🚨 Emergency Alert",
        body: `${user.username} has triggered an emergency alert`,
        data: { latitude, longitude, userId },
      })
    }
  }

  private async sendSMSViaAlternative(phoneNumber: string, message: string) {
    // Alternative free SMS service - you can register for free credits
    // This is just an example - you'd need to sign up for actual API keys
    const response = await fetch("https://api.smsgateway24.com/getdata/addsms", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userid: process.env.SMS_GATEWAY_USER_ID,
        password: process.env.SMS_GATEWAY_PASSWORD,
        mobile: phoneNumber,
        message: message,
        senderid: "WALKME",
      }),
    })

    if (!response.ok) {
      throw new Error("Alternative SMS service failed")
    }
  }

  private async sendBrowserNotification(userId: number, notification: any) {
    // Send browser push notification if user is online
    // This would integrate with your WebSocket service
    try {
      // Implementation depends on your WebSocket setup
      console.log(`Sending browser notification to user ${userId}:`, notification)
    } catch (error) {
      console.error("Failed to send browser notification:", error)
    }
  }

  // Method for sending general notifications via email
  async sendEmailNotification(to: string, subject: string, htmlContent: string) {
    try {
      await this.emailTransporter.sendMail({
        from: process.env.GMAIL_USER,
        to,
        subject,
        html: htmlContent,
      })
    } catch (error) {
      console.error("Failed to send email:", error)
      throw error
    }
  }

  // Method for sending push notifications
  async sendPushNotification(fcmToken: string, title: string, body: string, data?: any) {
    if (!fcmToken) return

    const message = {
      token: fcmToken,
      notification: { title, body },
      data: data || {},
    }

    try {
      await admin.messaging().send(message)
    } catch (error) {
      console.error("Failed to send push notification:", error)
      throw error
    }
  }
}
