'use strict';
const contentful = require('contentful');
const express = require("express");
const app = express();
//const port = 8000;
require('dotenv').config();

const client = contentful.createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_KEY
});

app.get("/gallery", (req, res) => {
	var fetchedContent = {
		items: []
	}
	var contentfulGalleryRequest = async () => {
	
		await client.getEntries({
			content_type: "gallery"
		})
		.then((response) => {
			response.items.forEach((item) => {
				fetchedContent.items.push(item)
			})
		})
		.catch(console.error)
		res.header('Access-Control-Allow-Origin', '*');
		res.send(fetchedContent.items);
	};
	contentfulGalleryRequest();
});
module.exports = app;
