import { Body, Controller, Param, Post } from '@nestjs/common';
import { WalkService } from './walk.service';

@Controller('walk')
export class WalkController {
    constructor(private readonly walkService: WalkService) { }

    @Post()
    create(@Body() body: { ownerId: string; durationMinutes: number }) {
        return this.walkService.createWalk(body);
    }

    @Post(':id/join')
    requestJoin(@Param('id') walkId: string, @Body('userId') userId: string) {
        return this.walkService.requestJoin(walkId, userId);
    }

    @Post(':id/accept')
    accept(@Param('id') walkId: string, @Body('userId') userId: string) {
        return this.walkService.acceptJoin(walkId, userId);
    }
}
