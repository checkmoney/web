import { Injectable } from '@nestjs/common';
import { readFile } from 'fs';
import * as Handlebars from 'handlebars';
import { resolve } from 'path';
import { promisify } from 'util';

import { money } from './handlebarsHelpers/money';
import { Templating } from './Templating';

type PrecompiledTempltes = {
  [name: string]: Handlebars.TemplateDelegate;
};

@Injectable()
export class HandlebarsTemplating implements Templating {
  private readonly precompiledTemplates = {};

  public constructor() {
    Handlebars.registerHelper('money', money);
  }

  public async render(templateName: string, context: object) {
    const compiled = await this.compile(templateName);

    return compiled(context);
  }

  private async compile(
    templateName: string,
  ): Promise<Handlebars.TemplateDelegate> {
    if (this.precompiledTemplates[templateName]) {
      return this.precompiledTemplates[templateName];
    }

    const templateContent = (await promisify(readFile)(
      resolve(__dirname, '../../../../templates', `${templateName}.hbs`),
    )).toString();

    const compiled = Handlebars.compile(templateContent);

    this.precompiledTemplates[templateName] = compiled;

    return compiled;
  }
}
