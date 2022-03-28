import { Injectable } from '@nestjs/common';
import { Calc } from '../../dto/calc.dto';

const calc: Calc[] = [];

@Injectable()
export class CalcService {
  private readonly calc: Calc[] = [];

  async log(): Promise<Calc[]> {
    return calc;
  }

  async summ(data: Calc): Promise<string> {
    const result = data.num1 + data.num2;
    const operationEntry = { ...data, type: 'summ', result: result };
    calc.push(operationEntry);
    return `Сумма двух чисел равна ${result}`;
  }

  async diff(data: Calc): Promise<string> {
    const result = data.num1 - data.num2;
    const operationEntry = { ...data, type: 'diff', result: result };
    calc.push(operationEntry);
    return `Разность двух чисел равна ${result}`;
  }

  async mult(data: Calc): Promise<string> {
    const result = data.num1 * data.num2;
    const operationEntry = { ...data, type: 'mult', result: result };
    calc.push(operationEntry);
    return `Произведение двух чисел равно ${result}`;
  }

  async div(data: Calc): Promise<string> {
    const result = data.num1 / data.num2;
    const operationEntry = { ...data, type: 'div', result: result };
    calc.push(operationEntry);
    return `Частное от деления двух чисел равно ${result}`;
  }
}
