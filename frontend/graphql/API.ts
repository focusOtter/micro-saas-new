/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateRecipeInput = {
  id?: string | null,
  owner?: string | null,
  coverImage: string,
  title: string,
  description: string,
  servings: number,
  ingredientsText: string,
  stepsText: string,
};

export type ModelRecipeConditionInput = {
  owner?: ModelStringInput | null,
  coverImage?: ModelStringInput | null,
  title?: ModelStringInput | null,
  description?: ModelStringInput | null,
  servings?: ModelIntInput | null,
  ingredientsText?: ModelStringInput | null,
  stepsText?: ModelStringInput | null,
  and?: Array< ModelRecipeConditionInput | null > | null,
  or?: Array< ModelRecipeConditionInput | null > | null,
  not?: ModelRecipeConditionInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type ModelIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type Recipe = {
  __typename: "Recipe",
  id: string,
  owner?: string | null,
  coverImage: string,
  title: string,
  description: string,
  servings: number,
  ingredientsText: string,
  stepsText: string,
  createdAt: string,
  updatedAt: string,
};

export type UpdateRecipeInput = {
  id: string,
  owner?: string | null,
  coverImage?: string | null,
  title?: string | null,
  description?: string | null,
  servings?: number | null,
  ingredientsText?: string | null,
  stepsText?: string | null,
};

export type DeleteRecipeInput = {
  id: string,
};

export type CreateUserInput = {
  id?: string | null,
  owner: string,
  stripeCustomerId?: string | null,
  username: string,
  email: string,
  profilePicture?: string | null,
  displayName?: string | null,
};

export type ModelUserConditionInput = {
  owner?: ModelStringInput | null,
  stripeCustomerId?: ModelStringInput | null,
  username?: ModelStringInput | null,
  email?: ModelStringInput | null,
  profilePicture?: ModelStringInput | null,
  displayName?: ModelStringInput | null,
  and?: Array< ModelUserConditionInput | null > | null,
  or?: Array< ModelUserConditionInput | null > | null,
  not?: ModelUserConditionInput | null,
};

export type User = {
  __typename: "User",
  id: string,
  owner: string,
  stripeCustomerId?: string | null,
  username: string,
  email: string,
  profilePicture?: string | null,
  displayName?: string | null,
  createdAt: string,
  updatedAt: string,
};

export type UpdateUserInput = {
  id: string,
  owner?: string | null,
  stripeCustomerId?: string | null,
  username?: string | null,
  email?: string | null,
  profilePicture?: string | null,
  displayName?: string | null,
};

export type DeleteUserInput = {
  id: string,
};

export type ModelRecipeFilterInput = {
  id?: ModelIDInput | null,
  owner?: ModelStringInput | null,
  coverImage?: ModelStringInput | null,
  title?: ModelStringInput | null,
  description?: ModelStringInput | null,
  servings?: ModelIntInput | null,
  ingredientsText?: ModelStringInput | null,
  stepsText?: ModelStringInput | null,
  and?: Array< ModelRecipeFilterInput | null > | null,
  or?: Array< ModelRecipeFilterInput | null > | null,
  not?: ModelRecipeFilterInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type ModelRecipeConnection = {
  __typename: "ModelRecipeConnection",
  items:  Array<Recipe | null >,
  nextToken?: string | null,
};

export type ModelUserFilterInput = {
  id?: ModelIDInput | null,
  owner?: ModelStringInput | null,
  stripeCustomerId?: ModelStringInput | null,
  username?: ModelStringInput | null,
  email?: ModelStringInput | null,
  profilePicture?: ModelStringInput | null,
  displayName?: ModelStringInput | null,
  and?: Array< ModelUserFilterInput | null > | null,
  or?: Array< ModelUserFilterInput | null > | null,
  not?: ModelUserFilterInput | null,
};

export type ModelUserConnection = {
  __typename: "ModelUserConnection",
  items:  Array<User | null >,
  nextToken?: string | null,
};

export type ModelSubscriptionRecipeFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  coverImage?: ModelSubscriptionStringInput | null,
  title?: ModelSubscriptionStringInput | null,
  description?: ModelSubscriptionStringInput | null,
  servings?: ModelSubscriptionIntInput | null,
  ingredientsText?: ModelSubscriptionStringInput | null,
  stepsText?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionRecipeFilterInput | null > | null,
  or?: Array< ModelSubscriptionRecipeFilterInput | null > | null,
};

export type ModelSubscriptionIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  in?: Array< number | null > | null,
  notIn?: Array< number | null > | null,
};

export type ModelSubscriptionUserFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  stripeCustomerId?: ModelSubscriptionStringInput | null,
  username?: ModelSubscriptionStringInput | null,
  email?: ModelSubscriptionStringInput | null,
  profilePicture?: ModelSubscriptionStringInput | null,
  displayName?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionUserFilterInput | null > | null,
  or?: Array< ModelSubscriptionUserFilterInput | null > | null,
};

export type CreateRecipeMutationVariables = {
  input: CreateRecipeInput,
  condition?: ModelRecipeConditionInput | null,
};

export type CreateRecipeMutation = {
  createRecipe?:  {
    __typename: "Recipe",
    id: string,
    owner?: string | null,
    coverImage: string,
    title: string,
    description: string,
    servings: number,
    ingredientsText: string,
    stepsText: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateRecipeMutationVariables = {
  input: UpdateRecipeInput,
  condition?: ModelRecipeConditionInput | null,
};

export type UpdateRecipeMutation = {
  updateRecipe?:  {
    __typename: "Recipe",
    id: string,
    owner?: string | null,
    coverImage: string,
    title: string,
    description: string,
    servings: number,
    ingredientsText: string,
    stepsText: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteRecipeMutationVariables = {
  input: DeleteRecipeInput,
  condition?: ModelRecipeConditionInput | null,
};

export type DeleteRecipeMutation = {
  deleteRecipe?:  {
    __typename: "Recipe",
    id: string,
    owner?: string | null,
    coverImage: string,
    title: string,
    description: string,
    servings: number,
    ingredientsText: string,
    stepsText: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateUserMutationVariables = {
  input: CreateUserInput,
  condition?: ModelUserConditionInput | null,
};

export type CreateUserMutation = {
  createUser?:  {
    __typename: "User",
    id: string,
    owner: string,
    stripeCustomerId?: string | null,
    username: string,
    email: string,
    profilePicture?: string | null,
    displayName?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateUserMutationVariables = {
  input: UpdateUserInput,
  condition?: ModelUserConditionInput | null,
};

export type UpdateUserMutation = {
  updateUser?:  {
    __typename: "User",
    id: string,
    owner: string,
    stripeCustomerId?: string | null,
    username: string,
    email: string,
    profilePicture?: string | null,
    displayName?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteUserMutationVariables = {
  input: DeleteUserInput,
  condition?: ModelUserConditionInput | null,
};

export type DeleteUserMutation = {
  deleteUser?:  {
    __typename: "User",
    id: string,
    owner: string,
    stripeCustomerId?: string | null,
    username: string,
    email: string,
    profilePicture?: string | null,
    displayName?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type GetRecipeQueryVariables = {
  id: string,
};

export type GetRecipeQuery = {
  getRecipe?:  {
    __typename: "Recipe",
    id: string,
    owner?: string | null,
    coverImage: string,
    title: string,
    description: string,
    servings: number,
    ingredientsText: string,
    stepsText: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListRecipesQueryVariables = {
  filter?: ModelRecipeFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListRecipesQuery = {
  listRecipes?:  {
    __typename: "ModelRecipeConnection",
    items:  Array< {
      __typename: "Recipe",
      id: string,
      owner?: string | null,
      coverImage: string,
      title: string,
      description: string,
      servings: number,
      ingredientsText: string,
      stepsText: string,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetUserQueryVariables = {
  id: string,
};

export type GetUserQuery = {
  getUser?:  {
    __typename: "User",
    id: string,
    owner: string,
    stripeCustomerId?: string | null,
    username: string,
    email: string,
    profilePicture?: string | null,
    displayName?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListUsersQueryVariables = {
  filter?: ModelUserFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListUsersQuery = {
  listUsers?:  {
    __typename: "ModelUserConnection",
    items:  Array< {
      __typename: "User",
      id: string,
      owner: string,
      stripeCustomerId?: string | null,
      username: string,
      email: string,
      profilePicture?: string | null,
      displayName?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type OnCreateRecipeSubscriptionVariables = {
  filter?: ModelSubscriptionRecipeFilterInput | null,
  owner?: string | null,
};

export type OnCreateRecipeSubscription = {
  onCreateRecipe?:  {
    __typename: "Recipe",
    id: string,
    owner?: string | null,
    coverImage: string,
    title: string,
    description: string,
    servings: number,
    ingredientsText: string,
    stepsText: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateRecipeSubscriptionVariables = {
  filter?: ModelSubscriptionRecipeFilterInput | null,
  owner?: string | null,
};

export type OnUpdateRecipeSubscription = {
  onUpdateRecipe?:  {
    __typename: "Recipe",
    id: string,
    owner?: string | null,
    coverImage: string,
    title: string,
    description: string,
    servings: number,
    ingredientsText: string,
    stepsText: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteRecipeSubscriptionVariables = {
  filter?: ModelSubscriptionRecipeFilterInput | null,
  owner?: string | null,
};

export type OnDeleteRecipeSubscription = {
  onDeleteRecipe?:  {
    __typename: "Recipe",
    id: string,
    owner?: string | null,
    coverImage: string,
    title: string,
    description: string,
    servings: number,
    ingredientsText: string,
    stepsText: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateUserSubscriptionVariables = {
  filter?: ModelSubscriptionUserFilterInput | null,
  owner?: string | null,
};

export type OnCreateUserSubscription = {
  onCreateUser?:  {
    __typename: "User",
    id: string,
    owner: string,
    stripeCustomerId?: string | null,
    username: string,
    email: string,
    profilePicture?: string | null,
    displayName?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateUserSubscriptionVariables = {
  filter?: ModelSubscriptionUserFilterInput | null,
  owner?: string | null,
};

export type OnUpdateUserSubscription = {
  onUpdateUser?:  {
    __typename: "User",
    id: string,
    owner: string,
    stripeCustomerId?: string | null,
    username: string,
    email: string,
    profilePicture?: string | null,
    displayName?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteUserSubscriptionVariables = {
  filter?: ModelSubscriptionUserFilterInput | null,
  owner?: string | null,
};

export type OnDeleteUserSubscription = {
  onDeleteUser?:  {
    __typename: "User",
    id: string,
    owner: string,
    stripeCustomerId?: string | null,
    username: string,
    email: string,
    profilePicture?: string | null,
    displayName?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};
