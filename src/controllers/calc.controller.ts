import { Controller, Header, Body, Get, Put } from '@nestjs/common';

import { Calc } from '../dto/calc.dto';
import { CalcService } from '../modules/calc/calc.service';

@Controller('calc')
export class CalcController {
  constructor(private calcService: CalcService) {}

  @Get('log')
  async log(): Promise<Calc[]> {
    return this.calcService.log();
  }

  @Put('summ')
  @Header('Summ-of-num1-and-num2', 'none')
  async summ(@Body() body: Calc): Promise<string> {
    return this.calcService.summ(body);
  }

  @Put('diff')
  @Header('Difference-of-num1-and-num2', 'none')
  async diff(@Body() body: Calc): Promise<string> {
    return this.calcService.diff(body);
  }

  @Put('mult')
  @Header('Multiply-of-num1-and-num2', 'none')
  async mult(@Body() body: Calc): Promise<string> {
    return this.calcService.mult(body);
  }

  @Put('div')
  @Header('Division-of-num1-and-num2', 'none')
  async div(@Body() body: Calc): Promise<string> {
    return this.calcService.div(body);
  }
}
