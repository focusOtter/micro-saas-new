import { envNameContext } from '../../cdk.context'
import { Construct } from 'constructs'
import * as s3 from 'aws-cdk-lib/aws-s3'
import * as iam from 'aws-cdk-lib/aws-iam'

type CreateSaasPicsBucketProps = {
	appName: string
	stage: envNameContext
	authenticatedRole: iam.IRole
}

export function createSaasPicsBucket(
	scope: Construct,
	props: CreateSaasPicsBucketProps
) {
	const fileStorageBucket = new s3.Bucket(
		scope,
		`${props.appName}-${props.stage}-bucket`,
		{
			cors: [
				{
					allowedMethods: [
						s3.HttpMethods.GET,
						s3.HttpMethods.POST,
						s3.HttpMethods.PUT,
						s3.HttpMethods.DELETE,
					],
					allowedOrigins: ['*'],
					allowedHeaders: ['*'],
					exposedHeaders: [
						'x-amz-server-side-encryption',
						'x-amz-request-id',
						'x-amz-id-2',
						'ETag',
					],
				},
			],
		}
	)

	// Let signed in users CRUD on their own objects in a protected directory
	const canReadUpdateDeleteFromOwnProtectedDirectory = new iam.PolicyStatement({
		effect: iam.Effect.ALLOW,
		actions: ['s3:PutObject', 's3:GetObject', 's3:DeleteObject'],
		resources: [
			`arn:aws:s3:::${fileStorageBucket.bucketName}/protected/\${cognito-identity.amazonaws.com:sub}/*`,
		],
	})

	new iam.ManagedPolicy(scope, 'SignedInUserManagedPolicy', {
		description:
			'managed Policy to allow access to s3 bucket by signed in users.',
		statements: [canReadUpdateDeleteFromOwnProtectedDirectory],
		roles: [props.authenticatedRole],
	})

	return fileStorageBucket
}
