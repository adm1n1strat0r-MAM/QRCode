import { google } from "googleapis";
// import axios from "axios";
// import multer from "multer";
// import fs from "fs";
// import path from "path";


const auth = new google.auth.GoogleAuth({
  keyFile: "credentials.json",
  scopes: [
    "https://www.googleapis.com/auth/drive",
    // "https://www.googleapis.com/auth/spreadsheets",
  ],
});
// const drive = google.drive({ version: "v3", auth });
const authClientObject = await auth.getClient();
const spreadsheetId = "1cpDWjOUDRvVQQQ1W7qhYzXs4tj11P5q0Uw46zYbTVLw";


const googleSheetsInstance = google.sheets({
  version: "v4",
  auth: authClientObject,
});

// Helper function to get data from Google Sheets
const getDataFromSheets = async () => {
  try {
    const response = await googleSheetsInstance.spreadsheets.values.get({
      spreadsheetId,
      range: "Sheet1!A2:aa100000",
    });

    return response.data.values;
  } catch (err) {
    throw err;
  }
};

export const getAllInfo = async (req, res, next) => {
  try {
    const values = await getDataFromSheets();

    const users = values.map((row) => ({
      Serial_Number: row[0],
      NAME: row[1],
      PASSPORT_NO: row[2],
      NATIONALITY: row[3],
      DOB: row[4],
      ADDRESS: row[5],
      PROGRAM: row[6],
      // ...other fields from the row
    }));

    res.send(users);
  } catch (err) {
    next(err);
  }
};
export const getInfo = async (req, res, next) => {
  try {
    const values = await getDataFromSheets();
    const row = values.find((row) => row[0] === req.params.id);
    const user = {
      Serial_Number: row[0],
      NAME: row[1],
      PASSPORT_NO: row[2],
      NATIONALITY: row[3],
      DOB: row[4],
      ADDRESS: row[5],
      PROGRAM: row[6],
      // ...other fields from the row
    };

    res.send(user);
  } catch (err) {
    next(err);
  }
};

export const updateInfo = async (req, res, next) => {
  try {
    const rows = await getDataFromSheets();
    const rowToUpdate = rows.find((row) => row[0] === req.params.id);

    if (!rowToUpdate) {
      return res.status(404).send("Row not found");
    }

    const rowIndex = rows.indexOf(rowToUpdate);
    const range = `Sheet1!A${rowIndex + 2}`;

    const updateResponse =
      await googleSheetsInstance.spreadsheets.values.update({
        spreadsheetId,
        range,
        valueInputOption: "USER_ENTERED",
        resource: { values: [Object.values(req.body)] },
      });

    res.send("Data updated successfully!");
  } catch (err) {
    next(err);
  }
};

export const addInfo = async (req, res, next) => {
  try {
    const detail = await googleSheetsInstance.spreadsheets.values.append({
      spreadsheetId, // Use the already authenticated client
      range: "Sheet1!A1",
      valueInputOption: "USER_ENTERED",
      resource: {
        values: [Object.values(req.body)],
      },
    });

    res.send("Data added successfully!"); // Confirmation message
  } catch (err) {
    next(err);
  }
};