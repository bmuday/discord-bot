const Discord = require("discord.js")
const client = new Discord.Client()
const fetch = require("node-fetch")

const sadWords = ["sad", "unhappy", "terrible", "miserable", "depressed", "anxious"]

const encouragements = ["Cheer up!", "Hang in there.", "You are a great person(bot)!"]

const getQuote = () => {
	return fetch("https://zenquotes.io/api/random")
		.then(res => res.json())
		.then(data => {
			return data[0]["q"] + " - " + data[0]["a"]
		})
		.catch(err => console.log(err))
}

client.on("ready", () => {
	console.log(`Logged in as ${client.user.tag}`)
})

client.on("message", msg => {
	if (msg.author.bot) return

	if (msg.content === "$inspire") {
		getQuote().then(quote => msg.channel.send(quote))
	}

	if (sadWords.some(word => msg.content.includes(word))) {
		const encouragement = encouragements[Math.floor(Math.random() * encouragements.length)]
		msg.reply(encouragement)
	}
})

client.login(process.env.TOKEN)
