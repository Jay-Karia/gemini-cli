/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import type { CommandModule, Argv } from 'yargs';
import fs from 'node:fs';
import { initializeOutputListenersAndFlush } from '../gemini.js';
import { debugLogger, getErrorMessage } from '@google/gemini-cli-core';
import { exitCli } from './utils.js';
import { loadSettings } from '../config/settings.js';

// Checks whether a settings file exists and displays appropriate message.
function checkSettingsFile(label: string, filePath: string): void {
  if (!filePath) {
    debugLogger.log(
      `ℹ ${label}: skipped (workspace settings are disabled in the home directory)`,
    );
    return;
  }

  if (fs.existsSync(filePath)) {
    debugLogger.log(`✅ ${label}: found (${filePath})`);
  } else {
    debugLogger.log(`⚠ ${label}: not found (${filePath})`);
  }
}

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
    try {
      debugLogger.log('Running diagnostics...\n');

      // Load settings to check for their presence and display their status
      const loadedSettings = loadSettings(process.cwd());

      const userSettingsFile = loadedSettings.user.path;
      const workspaceSettingsFile = loadedSettings.workspace.path;
      const systemSettingsFile = loadedSettings.system.path;

      // Check settings files
      checkSettingsFile('User settings', userSettingsFile);
      checkSettingsFile('Project settings', workspaceSettingsFile);
      checkSettingsFile('System settings', systemSettingsFile);

      await exitCli();
    } catch (error) {
      debugLogger.error(`Doctor failed: ${getErrorMessage(error)}`);
      await exitCli(1);
    }
  },
};
