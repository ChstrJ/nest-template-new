import { SetMetadata } from '@nestjs/common';

export const SkipResponseWrap = () => SetMetadata('skipWrap', true);
