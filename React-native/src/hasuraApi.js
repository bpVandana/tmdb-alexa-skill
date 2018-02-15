const clusterName = "actress71"
const dataUrl = "https://data."+clusterName+".hasura-app.io/v1/query";

import React, { Component } from 'react';
import { ActivityIndicator, ListView, Text, View, Alert } from 'react-native';
const networkErrorObj = {
  status: 503
}

export async function getLogs(){
  console.log('Making data query(get Request)');
  let requestOptions = {
      "method": "POST",
      "headers": {
          "Content-Type": "application/json"
      }
  };
  let body = {
      "type": "select",
      "args": {
          "table": "reslogs",
          "columns": [
              "serial",
              "rjson",
              "time"
          ]
      }
  };
  requestOptions["body"] = JSON.stringify(body);
  console.log('Data Response ---------------------');
  try {
  	let resp = await fetch(dataUrl, requestOptions);
    console.log(resp);
  	return resp;
  }
  catch(e) {
  	console.log("Request Failed: " + e);
    return networkErrorObj;
  }
}

export async function getResLogs() {
  console.log('Making data query (get response logs)');
  let requestOptions = {
      "method": "POST",
      "headers": {
          "Content-Type": "application/json"
      }
  };
  let body = {
      "type": "select",
      "args": {
          "table": "logs",
          "columns": [
            "Serial",
            "json",
            "time"
          ]
      }
  };
  requestOptions["body"] = JSON.stringify(body);
  console.log('Data Response ---------------------');
  try{
  	let resp = await fetch(dataUrl, requestOptions);
    console.log(resp);
  	return resp;
  }
  catch (e) {
  	console.log("Request failed: " + e);
    return networkErrorObj;
  }
};
