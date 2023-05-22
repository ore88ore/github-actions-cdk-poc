import { App, Stack, StackProps, aws_lambda as lambda } from 'aws-cdk-lib';
import { Construct } from 'constructs';

export class MyStack extends Stack {
  constructor(scope: Construct, id: string, props: StackProps = {}) {
    super(scope, id, props);

    new lambda.Function(this, 'yus_sakaiTestFunction', {
      code: lambda.Code.fromInline(`
        exports.handler = async (event, context) => {
          console.log('Hello, CDK!');
          return {
            statusCode: 200,
            body: 'Lambda function executed successfully!',
          };
        };
      `),
      handler: 'index.handler',
      runtime: lambda.Runtime.NODEJS_18_X,
    });
  }
}


// for development, use account/region from cdk cli
const devEnv = {
  account: process.env.CDK_DEFAULT_ACCOUNT,
  region: process.env.CDK_DEFAULT_REGION,
  // hoge
};

const app = new App();

new MyStack(app, 'yus-sakai-test', { env: devEnv });
// new MyStack(app, 'github-actions-cdk-poc-prod', { env: prodEnv });

app.synth();
