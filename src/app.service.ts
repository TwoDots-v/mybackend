import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
  Bonjour():string{
    return 'Bonjour';
  }
  //added to send mail
  constructor(private mailerService: MailerService) {}
  async sendUserConfirmation(user: any, token: string) {
  const url = `index2.html/auth/confirm?token=${token}`;
 // const url=`index2.html`
    console.log("*****URL*****",url)
   // console.log("*****mailerService*****",mailerService)
    await this.mailerService.sendMail({
      to: user.email,
      // from: '"Support Team" <support@example.com>', // override default from
      subject: 'Welcome to Nice App! Confirm your Email',
      template: './confirmation', // `.hbs` extension is appended automatically
      context: { // :pencil2: filling curly brackets with content
        name: user.name,
        url,
      },
    });
  }
  async SENDMAIL(data:string){
    console.log("*********",data)
    await this.mailerService.sendMail({
      to:data,
      from:"rima@test.fr",
      subject:"simple test",
      text:"welcome"
    })
  }
}