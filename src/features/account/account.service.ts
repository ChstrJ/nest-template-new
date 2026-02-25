import { Body, Injectable } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { AccountRepository } from './account.repository';
import { hashPassword } from 'src/lib/hash';

@Injectable()
export class AccountService {
  constructor(private readonly accountRepository: AccountRepository) {}

  async findAll() {
    const data = await this.accountRepository.findAll();

    return data;
  }

  findOne(id: number) {
    return `This action returns a #${id} account`;
  }

  update(id: number, updateAccountDto: UpdateAccountDto) {
    return `This action updates a #${id} account`;
  }

  remove(id: number) {
    return `This action removes a #${id} account`;
  }

  async createAccount(@Body() data: CreateAccountDto) {
    data.account_password = await hashPassword(data.account_password);

    return this.accountRepository.insert(data);
  }
}
