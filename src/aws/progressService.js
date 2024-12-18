import AWS from './awsConfig.js';
import { DYNAMO_TABLE, PLAYER_ID } from '../utils/consts.js';

const dynamodb = new AWS.DynamoDB.DocumentClient();

export async function getPlayerProgress() {
  const params = {
    TableName: DYNAMO_TABLE,
    Key: { playerId: PLAYER_ID }
  };

  try {
    const data = await dynamodb.get(params).promise();
    return data.Item || { playerId: PLAYER_ID, currentLevel: 1 };
  } catch (err) {
    console.error("Error fetching player progress:", err);
    return { playerId: PLAYER_ID, currentLevel: 1 };
  }
}

export async function updatePlayerProgress(level) {
  const params = {
    TableName: DYNAMO_TABLE,
    Item: {
      playerId: PLAYER_ID,
      currentLevel: level
    }
  };

  try {
    await dynamodb.put(params).promise();
    console.log(`Player progress updated to level ${level}`);
  } catch (err) {
    console.error("Error updating player progress:", err);
  }
}
