import { ApiModelProperty } from '@nestjs/swagger';

import { GoogleProfile } from '&shared/models/user/external/GoogleProfile';

export class GoogleBindRequest implements GoogleProfile {
  @ApiModelProperty({ example: '118386561850719338466' })
  public readonly id: string;

  @ApiModelProperty({ example: 'Игорь Камышев' })
  public readonly name: string;

  @ApiModelProperty({
    example:
      'https://lh5.googleusercontent.com/-jM0jW1cJaCc/AAAAAAAAAAI/AAAAAAACM-E/l7C1Y9QNEMw/s96-c/photo.jpg',
    required: false,
  })
  public readonly photo?: string;

  @ApiModelProperty({ example: 'garik.novel@gmail.com', required: false })
  public readonly email?: string;

  @ApiModelProperty({ example: 'hkdsfkllkds' })
  public readonly token: string;
}
