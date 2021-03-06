/*MIT License

Copyright (c) 2017 MTA SZTAKI

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.*/

var util = require('util');
var ape = require('../ape.js');
var moduleManager = require('../modules/module_manager/module_manager.js');
var express = moduleManager.requireNodeModule('express');
var app = express();
var utils = require('../modules/utils/utils.js');
var logger = require("../modules/logger/logger.js");

exports.moduleTag = 'ApeHTTPApiNode';

app.get('/nodes/usernode/name', function(req, res) {
	console.log('ape.httpApi.nodes.usernode.name()');
	var respObj = new utils.responseObj();
	ape.nbind.JsBindManager().getUserNode(function(error, obj) {
		console.log('ape.nbind.JsBindManager().getUserNode() callback');
		if (error) {
			respObj.addErrorItem({
				name: 'invalidCast',
				msg: obj,
				code: 666
			});
			res.status(400).send(respObj.toJSonString());
			return;
		}

		respObj.addDataItem({
			name: obj.getName()
		});
		console.log('ape.nbind.JsBindManager().getUserNode() callback respObj:', respObj);
		res.send(respObj.toJSonString());
	});
});

app.post('/nodes', function(req, res) {
	console.log('ape.httpApi.nodes.create()');
	var respObj = new utils.responseObj();

	// handle http param validation errors
	req.checkBody('name', 'BodyParam is not presented').notEmpty()
	req.checkBody('name', 'BodyParam must be a string').isAlpha();
	if (!respObj.validateHttpParams(req, res)) {
		res.status(400).send(respObj.toJSonString());
		return;
	}

	// get name from url
	var name = req.body.name;
	var nodeObj = ape.nbind.JsBindManager().createNode(name);
	respObj.addEvent({
		group: 'NODE',
		type: 'NODE_CREATE',
		subjectName: nodeObj.getName()
	});
	res.send(respObj.toJSonString());
});

app.get('/nodes/:name/position', function(req, res) {
	console.log('ape.httpApi.nodes.getPosition()');
	var respObj = new utils.responseObj();

	// handle http param validation errors
	req.checkParams('name', 'UrlParam is not presented').notEmpty()
	req.checkParams('name', 'UrlParam must be a string').isAlpha();
	if (!respObj.validateHttpParams(req, res)) {
		res.status(400).send(respObj.toJSonString());
		return;
	}

	// get name from url
	var name = req.params.name;

	ape.nbind.JsBindManager().getNode(name, function(error, obj) {
		if (error) {
			respObj.addErrorItem({
				name: 'invalidCast',
				msg: obj,
				code: 666
			});
			res.status(400).send(respObj.toJSonString());
			return;
		}

		respObj.addDataItem({
			position: utils.convertToJsObj(obj.getPosition())
		});
		res.send(respObj.toJSonString());
	});
});

app.post('/nodes/:name/position', function(req, res) {
	console.log('ape.httpApi.nodes.setPosition()');
	var respObj = new utils.responseObj();

	// handle http param validation errors
	req.checkParams('name', 'UrlParam is not presented').notEmpty()
	req.checkParams('name', 'UrlParam must be a string').isAlpha();
	req.checkBody('x', 'BodyParam is not presented').notEmpty();
	req.checkBody('y', 'BodyParam is not presented').notEmpty();
	req.checkBody('z', 'BodyParam is not presented').notEmpty();
	if (!respObj.validateHttpParams(req, res)) {
		res.status(400).send(respObj.toJSonString());
		return;
	}

	// get node name from urlParam
	var name = req.params.name;

	ape.nbind.JsBindManager().getNode(name, function(error, obj) {
		if (error) {
			respObj.addErrorItem({
				name: 'invalidCast',
				msg: obj,
				code: 666
			});
			res.status(400).send(respObj.toJSonString());
			return;
		}

		var newPos = new ape.nbind.Vector3(Number(req.body.x), Number(req.body.y), Number(req.body.z));
		// if (newPos.notEqualTo(obj.getPosition())) {
		//   respObj.addEvent({
		//     group: 'NODE',
		//     type: 'NODE_POSITION',
		//     subjectName: obj.getName()
		//   });
		// }
		obj.setPosition(newPos);
		respObj.addDataItem({
			position: utils.convertToJsObj(obj.getPosition())
		});
		res.send(respObj.toJSonString());
	});
});

app.get('/nodes/:name/orientation', function(req, res) {
	console.log('ape.httpApi.nodes.getOrientation()');
	var respObj = new utils.responseObj();

	// handle http param validation errors
	req.checkParams('name', 'UrlParam is not presented').notEmpty()
	req.checkParams('name', 'UrlParam must be a string').isAlpha();
	if (!respObj.validateHttpParams(req, res)) {
		res.status(400).send(respObj.toJSonString());
		return;
	}

	// get name from url
	var name = req.params.name;

	ape.nbind.JsBindManager().getNode(name, function(error, obj) {
		if (error) {
			respObj.addErrorItem({
				name: 'invalidCast',
				msg: obj,
				code: 666
			});
			res.status(400).send(respObj.toJSonString());
			return;
		}

		respObj.addDataItem({
			orientation: utils.convertToJsObj(obj.getOrientation())
		});
		res.send(respObj.toJSonString());
	});
});

app.post('/nodes/:name/orientation', function(req, res) {
	console.log('ape.httpApi.nodes.setOrientation()');
	var respObj = new utils.responseObj();

	// handle http param validation errors
	req.checkParams('name', 'UrlParam is not presented').notEmpty()
	req.checkParams('name', 'UrlParam must be a string').isAlpha();
	req.checkBody('w', 'BodyParam is not presented').notEmpty();
	req.checkBody('x', 'BodyParam is not presented').notEmpty();
	req.checkBody('y', 'BodyParam is not presented').notEmpty();
	req.checkBody('z', 'BodyParam is not presented').notEmpty();
	if (!respObj.validateHttpParams(req, res)) {
		res.status(400).send(respObj.toJSonString());
		return;
	}

	// get node name from urlParam
	var name = req.params.name;

	ape.nbind.JsBindManager().getNode(name, function(error, obj) {
		if (error) {
			respObj.addErrorItem({
				name: 'invalidCast',
				msg: obj,
				code: 666
			});
			res.status(400).send(respObj.toJSonString());
			return;
		}

		var newOrt = new ape.nbind.Quaternion(Number(req.body.w), Number(req.body.x), Number(req.body.y), Number(req.body.z));
		// if (newOrt.notEqualTo(obj.getOrientation())) {
		//   respObj.addEvent({
		//     group: 'NODE',
		//     type: 'NODE_ORIENTATION',
		//     subjectName: obj.getName()
		//   });
		// }
		obj.setOrientation(newOrt);
		respObj.addDataItem({
			orientation: utils.convertToJsObj(obj.getOrientation())
		});
		res.send(respObj.toJSonString());
	});
});

module.exports = app;
