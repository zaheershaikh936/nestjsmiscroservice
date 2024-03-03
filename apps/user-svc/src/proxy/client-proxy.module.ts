import { Module, Global } from '@nestjs/common';
import { ClientProxyFactory, ClientProxy } from '@nestjs/microservices';
import { Transport } from '@nestjs/microservices/enums/transport.enum';

@Global()
@Module({
  providers: [
    {
      provide: 'PRODUCT_PROXY',
      useFactory: (): ClientProxy => {
        return ClientProxyFactory.create({
          transport: Transport.TCP,
          options: {
            host: '127.0.0.1',
            port: 8877,
          },
        });
      },
    },
  ],
  exports: ['PRODUCT_PROXY'],
})
export class ClientProxyModule {}
