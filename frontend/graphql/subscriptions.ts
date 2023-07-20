/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateRecipe = /* GraphQL */ `
  subscription OnCreateRecipe(
    $filter: ModelSubscriptionRecipeFilterInput
    $owner: String
  ) {
    onCreateRecipe(filter: $filter, owner: $owner) {
      id
      owner
      coverImage
      title
      description
      servings
      ingredientsText
      stepsText
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateRecipe = /* GraphQL */ `
  subscription OnUpdateRecipe(
    $filter: ModelSubscriptionRecipeFilterInput
    $owner: String
  ) {
    onUpdateRecipe(filter: $filter, owner: $owner) {
      id
      owner
      coverImage
      title
      description
      servings
      ingredientsText
      stepsText
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteRecipe = /* GraphQL */ `
  subscription OnDeleteRecipe(
    $filter: ModelSubscriptionRecipeFilterInput
    $owner: String
  ) {
    onDeleteRecipe(filter: $filter, owner: $owner) {
      id
      owner
      coverImage
      title
      description
      servings
      ingredientsText
      stepsText
      createdAt
      updatedAt
    }
  }
`;
export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser(
    $filter: ModelSubscriptionUserFilterInput
    $owner: String
  ) {
    onCreateUser(filter: $filter, owner: $owner) {
      id
      owner
      stripeCustomerId
      username
      email
      profilePicture
      displayName
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser(
    $filter: ModelSubscriptionUserFilterInput
    $owner: String
  ) {
    onUpdateUser(filter: $filter, owner: $owner) {
      id
      owner
      stripeCustomerId
      username
      email
      profilePicture
      displayName
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser(
    $filter: ModelSubscriptionUserFilterInput
    $owner: String
  ) {
    onDeleteUser(filter: $filter, owner: $owner) {
      id
      owner
      stripeCustomerId
      username
      email
      profilePicture
      displayName
      createdAt
      updatedAt
    }
  }
`;
