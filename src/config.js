const prod = {
  s3: {
    REGION: "us-east-1",
    BUCKET: "notes-app-2-api-prod-attachmentsbucket-v9i3b6b9xt0m"
  },
  apiGateway: {
    REGION: "us-east-1",
    URL: "https://api.openelastic.org/prod"
  },
  cognito: {
    REGION: "us-east-1",
    USER_POOL_ID: "us-east-1_jZNYUMJnx",
    APP_CLIENT_ID: "4dm3n6he6vb1ied925klsbhj02",
    IDENTITY_POOL_ID: "us-east-1:cc4e4465-883d-464b-87da-3753e31cab35"
  }
};

const dev = {
	  s3: {
	    REGION: "us-east-1",
	    BUCKET: "notes-app-2-api-dev-attachmentsbucket-1o95usyjx6jvu"
	  },
	  apiGateway: {
	    REGION: "us-east-1",
	    URL: "https://api.openelastic.org/dev"
	  },
	  cognito: {
	    REGION: "us-east-1",
	    USER_POOL_ID: "us-east-1_FiFXEDDxh",
	    APP_CLIENT_ID: "68l6ufmr6evmeegt6a64p004tk",
	    IDENTITY_POOL_ID: "us-east-1:9603adbb-5f16-4234-9fec-3602d2951a2b"
	  }
};

//Default to dev if not set
const config = process.env.REACT_APP_STAGE === 'prod'
  ? prod
  : prod;

export default {
	  MAX_ATTACHMENT_SIZE: 5000000,
	  ...config
}