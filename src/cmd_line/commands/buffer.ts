import * as vscode from 'vscode';

import * as error from '../../error';
import * as node from '../node';

export interface IBDeleteCommandArguments extends node.ICommandArgs {
  bang?: boolean;
}

//
//  Implements :bdelete
//  http://vimdoc.sourceforge.net/htmldoc/windows.html#:bdelete
//
export class BDeleteCommand extends node.CommandBase {
  protected _arguments: IBDeleteCommandArguments;

  constructor(args: IBDeleteCommandArguments) {
    super();
    this._arguments = args;
  }

  get arguments(): IBDeleteCommandArguments {
    return this._arguments;
  }

  async execute(): Promise<void> {
    if (this.activeTextEditor!.document.isDirty && !this.arguments.bang) {
      throw error.VimError.fromCode(error.ErrorCode.NoWriteSinceLastChange);
    }

    let oldViewColumn = this.activeTextEditor!.viewColumn;
    await vscode.commands.executeCommand('workbench.action.closeActiveEditor');

    if (
      vscode.window.activeTextEditor !== undefined &&
      vscode.window.activeTextEditor.viewColumn === oldViewColumn
    ) {
      await vscode.commands.executeCommand('workbench.action.previousEditor');
    }
  }
}
