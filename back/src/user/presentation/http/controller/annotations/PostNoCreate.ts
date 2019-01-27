import { ComposeMethodDecorators } from '@breadhead/detil-ts'
import { HttpCode, Post } from '@nestjs/common'

export const PostNoCreate = (path?: string) =>
  ComposeMethodDecorators([Post(path), HttpCode(200)])
