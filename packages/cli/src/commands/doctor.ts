/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import type { CommandModule, Argv } from 'yargs';
import { initializeOutputListenersAndFlush } from '../gemini.js';
import { debugLogger } from '@google/gemini-cli-core';
import { exitCli } from './utils.js';

export const doctorCommand: CommandModule = {
  command: 'doctor',
  describe: 'Run diagnostics to check for config issues',
  builder: (yargs: Argv) =>
    yargs
      .middleware((argv) => {
        initializeOutputListenersAndFlush();
        argv['isCommand'] = true;
      })
      .version(false),
  handler: async () => {
    debugLogger.log('Doctor command placeholder.');
    await exitCli();
  },
};
