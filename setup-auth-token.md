# Setting up Sanity Authentication Token

## Step 1: Get Your Auth Token

1. Go to [Sanity Manage](https://sanity.io/manage)
2. Select your project (`jsxpecp1`)
3. Go to **API** tab
4. Under **Tokens**, click **Add API token**
5. Name: `Marketing App Content Creation`
6. Permissions: **Editor** (to create/edit content)
7. Copy the generated token

## Step 2: Add Token to Environment

Add this line to your `.env` file:
```bash
SANITY_AUTH_TOKEN=your_token_here
```

## Step 3: Test Content Creation

After adding the schemas to your Sanity Studio and deploying them:

```bash
node create-initial-content.js
```

This will create:
- 1 Hero section
- 3 Services (Vision/Scale/Thrive)  
- 3 Case studies (from existing portfolio)
- Contact information
- Site settings

## Ready to Continue?

Once you have:
1. ✅ Added the 5 marketing schemas to your Sanity Studio
2. ✅ Deployed the schemas (`sanity deploy`)
3. ✅ Added your auth token to `.env`

You can run the content creation script and proceed to Phase 4.