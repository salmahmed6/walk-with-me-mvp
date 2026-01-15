import { Module } from '@nestjs/common';
import { WalkService } from './walk.service';
import { WalkController } from './walk.controller';

@Module({
    controllers: [WalkController],
    providers: [WalkService],
})
export class WalkModule { }
