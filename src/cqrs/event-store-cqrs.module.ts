import { CommandBus, CqrsModule, EventBus, QueryBus } from '@nestjs/cqrs';
import { DynamicModule, Global, Logger, Module } from '@nestjs/common';
import { EventStoreBus } from './event-store.bus';
import { EventStore } from '../event-store.class';
import { EventStoreModule } from '../event-store.module';
import {
  EventStoreModuleAsyncOptions,
  EventStorePublisher,
  IEventStoreBusConfig,
  IEventStoreConfig,
} from '..';

@Global()
@Module({})
export class EventStoreCqrsModule extends CqrsModule {
  static register(
    eventStoreConfig: IEventStoreConfig,
    eventStoreBusConfig: IEventStoreBusConfig,
  ): DynamicModule {
    return {
      module: EventStoreCqrsModule,
      imports: [
        CqrsModule,
        EventBus,
        EventStoreModule.register(eventStoreConfig),
      ],
      providers: [
        Logger,
        CommandBus,
        QueryBus,
        EventStorePublisher,
        {
          provide: EventStoreBus,
          useFactory: async (commandBus, eventStore, eventBus, logger) => {
            return new EventStoreBus(
              eventStore,
              eventStoreBusConfig,
              eventBus,
              logger,
            );
          },
          inject: [CommandBus, EventStore, EventBus, Logger],
        },
      ],
      exports: [
        EventStoreModule,
        EventStorePublisher,
        CommandBus,
        QueryBus,
        EventBus,
      ],
    };
  }
  static registerAsync(
    eventStoreConfigFactory: EventStoreModuleAsyncOptions,
    eventStoreBusConfig: IEventStoreBusConfig,
  ): DynamicModule {
    return {
      module: EventStoreCqrsModule,
      imports: [
        CqrsModule,
        EventBus,
        EventStoreModule.registerAsync(eventStoreConfigFactory),
      ],
      providers: [
        Logger,
        CommandBus,
        QueryBus,
        EventStorePublisher,
        {
          provide: EventStoreBus,
          useFactory: async (commandBus, eventStore, eventBus, logger) => {
            return new EventStoreBus(
              eventStore,
              eventStoreBusConfig,
              eventBus,
              logger,
            );
          },
          inject: [CommandBus, EventStore, EventBus, Logger],
        },
      ],
      exports: [
        EventStoreModule,
        EventStorePublisher,
        CommandBus,
        QueryBus,
        EventBus,
      ],
    };
  }
}