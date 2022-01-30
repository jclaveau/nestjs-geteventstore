import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { EventStoreHeroesModule } from '../src/heroes/event-store-heroes.module';
import { AllExceptionFilter } from '../src/all-exception.filter';

import { INestApplication } from '@nestjs/common';

// class Logger implements LoggerService { ... }

describe('Application', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [EventStoreHeroesModule],
    })
    // .setLogger(new Logger())
    .compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalFilters(new AllExceptionFilter());

    process.once('uncaughtException', (e: Error) => {
      if (e['code'] !== 'ERR_STREAM_WRITE_AFTER_END') {
        throw e;
      }
    });

    await app.init();

    // jest.setTimeout(10000)
  });

  afterAll(async () => {
    await app.close();
  });

  it('returns heroes', async (done) => {
    const server = app.getHttpServer();

    // const response = await request(server)
    //   .get('/hero')
    // console.log(response)

    await request(server)
      .get('/hero')
      .expect(200)
      .then((response) => {
        // Check the response type and length
        expect(Array.isArray(response.body)).toBeTruthy()
        expect(response.body.length).toEqual(1)
        expect(response.body[0].id).toEqual('greg');

        console.log('OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOK')
      })
  //     // .end(done);
  });

});
