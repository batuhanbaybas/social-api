import { IsString } from 'class-validator';

export class CreateFeedDto {
  @IsString({
    message: 'Title is required',
  })
  title: string;
  @IsString({
    message: 'Content is required',
  })
  content: string;
}
