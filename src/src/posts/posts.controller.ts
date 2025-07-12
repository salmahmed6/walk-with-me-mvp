import { Controller, Get, Post, Body, Param, Delete, UseGuards, Query } from "@nestjs/common"
import { JwtAuthGuard } from "../auth/jwt-auth.guard"
import type { PostsService } from "./posts.service"
import type { CreatePostDto } from "./dto/create-post.dto"

@Controller("posts")
@UseGuards(JwtAuthGuard)
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  create(@Body() createPostDto: CreatePostDto, @Request() req) {
    return this.postsService.create(req.user.userId, createPostDto)
  }

  @Get("feed")
  getFeed(@Query('page') page: string = '1', @Query('limit') limit: string = '20', @Request() req) {
    return this.postsService.getFeed(+page, +limit)
  }

  @Get('user/:userId')
  getUserPosts(@Param('userId') userId: string) {
    return this.postsService.getUserPosts(+userId);
  }

  @Delete(":id")
  remove(@Param('id') id: string, @Request() req) {
    return this.postsService.remove(req.user.userId, +id)
  }
}
