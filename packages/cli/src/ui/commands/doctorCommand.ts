/**
 * @license
 * Copyright 2026 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommandKind, type SlashCommand } from './types.js';
import { type MessageActionReturn } from '@google/gemini-cli-core';

export const doctorCommand: SlashCommand = {
  name: 'doctor',
  description: 'Run diagnostics to check for config issues',
  kind: CommandKind.BUILT_IN,
  autoExecute: true,
  action: (context): MessageActionReturn => {
    const config = context.services.config;

    // eslint-disable-next-line no-console
    console.log(config);

    return {
      type: 'message',
      messageType: 'info',
      content: 'Gemini CLI Doctor Report',
    };
  },
};
