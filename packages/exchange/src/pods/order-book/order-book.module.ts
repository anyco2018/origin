import { Module } from '@nestjs/common';

import { GridOperatorValidator } from '../../utils/gridOperatorValidator';
import { DeviceTypeValidator } from '../../utils/deviceTypeValidator';
import { MatchingEngineModule } from '../matching-engine/matching-engine.module';
import { OrderBookController } from './order-book.controller';
import { OrderBookService } from './order-book.service';
import { RunnerModule } from '../runner/runner.module';

@Module({
    providers: [OrderBookService, DeviceTypeValidator, GridOperatorValidator],
    imports: [MatchingEngineModule, RunnerModule],
    controllers: [OrderBookController]
})
export class OrderBookModule {}
