const express = require('express');
const { Tikmate, snaptik, tikdown, ttdownloader, tikwm } = require('tiktok-scraper');

const app = express();
app.use(express.json());

class TikTokDownloader {
    async getVideoInfo(url) {
        const results = {};
        let num = 0;

        // Tikmate
        try {
            const d1 = await Tikmate.getVideoMeta(url);
            results[`TikmateVideo${num}`] = d1;
            num++;
        } catch {
            results[`TikmateVideo${num}`] = "Video not found";
        }

        // snaptik
        try {
            const d2 = await snaptik.getVideoMeta(url);
            results[`snaptikVideo${num}`] = d2;
            num++;
        } catch {
            results[`snaptikVideo${num}`] = "Video not found";
        }

        // ttdownloader
        try {
            const d3 = await ttdownloader.getVideoMeta(url);
            results[`ttdownloaderVideo${num}`] = d3;
            num++;
        } catch {
            results[`ttdownloaderVideo${num}`] = "Video not found";
        }

        // tikwm
        try {
            const d4 = await tikwm.getVideoMeta(url);
            results[`tikwmVideo${num}`] = d4;
            num++;
        } catch {
            results[`tikwmVideo${num}`] = "Video not found";
        }

        // tikdown
        try {
            const d5 = await tikdown.getVideoMeta(url);
            results[`tikdownVideo${num}`] = d5;
            num++;
        } catch {
            results[`tikdownVideo${num}`] = "Video not found";
        }

        return results;
    }
}

app.post('/video', async (req, res) => {
    const url = req.body.url;
    const downloader = new TikTokDownloader();
    const videoInfo = await downloader.getVideoInfo(url);
    res.json(videoInfo);
});

app.get('/video', async (req, res) => {
    const url = req.query.url;
    const downloader = new TikTokDownloader();
    const videoInfo = await downloader.getVideoInfo(url);
    res.json(videoInfo);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
