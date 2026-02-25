import { Command, CommandRunner, Option } from 'nest-commander';

@Command({
  name: 'say-hello',
  description: 'A simple command to greet the user'
})
export class HelloCommand extends CommandRunner {
  async run(
    passedParam: string[],
    options?: { name?: string },
  ): Promise<void> {
    const name = options?.name ?? passedParam[0] ?? 'World';
    console.log(`Hello, ${name}!`);
  }

  @Option({
    flags: '-n, --name [string]',
    description: 'The name to greet',
  })

  parseName(val: string): string {
    return val;
  }
}
