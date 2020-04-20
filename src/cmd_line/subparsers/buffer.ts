import { ErrorCode, VimError } from '../../error';
import * as node from '../commands/buffer';
import { Scanner } from '../scanner';

export function parseBDeleteCommandArgs(args: string): node.BDeleteCommand {
  if (!args) {
    return new node.BDeleteCommand({});
  }
  const scannedArgs: node.IBDeleteCommandArguments = {};
  const scanner = new Scanner(args);
  const c = scanner.next();
  if (c === '!') {
    scannedArgs.bang = true;
    scanner.ignore();
  } else if (c !== ' ') {
    throw VimError.fromCode(ErrorCode.TrailingCharacters);
  }
  scanner.skipWhiteSpace();
  if (!scanner.isAtEof) {
    throw VimError.fromCode(ErrorCode.TrailingCharacters);
  }
  return new node.BDeleteCommand(scannedArgs);
}
