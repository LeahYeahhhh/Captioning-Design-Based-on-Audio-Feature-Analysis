

    let video;
    let canvas;
    let subtitles; // 用于存储字幕数据的数组
    let emphsiseSubtitles;//[低语]
    let currentSubtitleIndex = -1; // 当前字幕的索引

    let emphsiseSubtitleIndex = -1; // 当前字幕的索引
    let shoutSubtitles;//样式shout存储字幕的数组【大喊】
    let shoutSubtitleIndex = -1; // 当前shout字幕的索引

    let whisperSubtitles;//样式whisper存储字幕的数组【悄悄话】
    let whisperSubtitleIndex = -1; // 当前whisper字幕的索引
    let currentVideoTime = 0; //存储播放时间
    let font; //全局字体样式


    function parseSRT(subtitleText) {
        const subtitles = [];
        const subtitleBlocks = subtitleText.split('\n\n');

        for (const block of subtitleBlocks) {
            const lines = block.split('\n');
            if (lines.length >= 3) {
                const index = parseInt(lines[0]);
                const timeString = lines[1];
                const text = lines.slice(2).join('\n');


                // 测试函数
                const startTimeValue = timeString.split(' --> ')[0];
                const startTime = timeStringToSeconds(startTimeValue);


                const endTimeValue = timeString.split(' --> ')[1];
                const endTime = timeStringToSeconds(endTimeValue);

                subtitles.push({
                        index,
                        startTime,
                        endTime,
                        text
                    }
                );
            }
        }

        return subtitles;
    }


    function timeStringToSeconds(timeString) {
        // 使用正则表达式将时间字符串拆分为小时、分钟、秒和毫秒部分
        const regex = /(\d{2}):(\d{2}):(\d{2}),(\d{3})/;
        const match = timeString.match(regex);


        // 从正则匹配中提取小时、分钟、秒和毫秒的值
        const hours = parseInt(match[1]);
        const minutes = parseInt(match[2]);
        const seconds = parseInt(match[3]);
        const milliseconds = parseInt(match[4]);

        // 计算总秒数，包括毫秒（保留3位小数）
        const totalSeconds = hours * 3600 + minutes * 60 + seconds + milliseconds / 1000;

        return totalSeconds.toFixed(3); // 保留3位小数
    }

    function preload() {
        subtitles = loadStrings('assets/01.srt'); // 替换成您的SRT文件路径
        emphsiseSubtitles = loadStrings('assets/emphsise.srt'); // 替换成您的SRT文件路径
        shoutSubtitles = loadStrings('assets/shout.srt'); // 替换成您的SRT文件路径
        whisperSubtitles = loadStrings('assets/whisper.srt'); // 替换成您的SRT文件路径
        font = loadFont("assets/arial.ttf");
    }


    function setup() {


        canvas = createCanvas(1920, 1080);

        // 解析字幕
        subtitles = parseSRT(subtitles.join('\n'));
        emphsiseSubtitles = parseSRT(emphsiseSubtitles.join('\n'));
        shoutSubtitles = parseSRT(shoutSubtitles.join('\n'));

        whisperSubtitles = parseSRT(whisperSubtitles.join('\n'));

        video = createVideo('assets/01.mp4');

        video.hide();
        //canvas.mousePressed(startVideo);

        button = createButton('播放');
        button2 = createButton('暂停')
        button.position(20, 20);
        button2.position(80, 20);
        button.mousePressed(startVideo);
        button2.mousePressed(pauseVideo);
        textAlign(LEFT);

    }


    currentVideoTime = 0;


    function shout(fullString, x, y) {
        let startX = x
        if (typeof shoutSubtitles[shoutSubtitleIndex] !== "undefined") {

            let searchFull = fullString;
            let searchString = shoutSubtitles[shoutSubtitleIndex].text;

            let index = searchFull.indexOf(searchString);
            //
            if (index !== -1) {

                let foundPart1 = fullString.slice(0, index);
                let foundPart = searchString;

                let foundPart2 = fullString.slice(index + searchString.length, fullString.length);

                fill(255);
                textSize(50);

                let x1 = startX;
                let x2 = startX + textWidth(foundPart1);


                whisper(foundPart1, x1, y);


                textWidthByFoundPart1 = textWidth(foundPart1);
                push();
                textSize(52);
                textStyle(BOLD);
                fill(255, 255, 0);
                text(foundPart, x2, y);

                let x3 = startX + textWidthByFoundPart1 + textWidth(foundPart);
                pop();


                whisper(foundPart2, x3, y);


            } else {

                whisper(fullString, x, y);


            }

        }
    }

    function w2(fullString, x, y) {
        let startX = x
        if (typeof whisperSubtitles[whisperSubtitleIndex] !== "undefined") {

            let searchFull = fullString;
            let searchString = whisperSubtitles[whisperSubtitleIndex].text;
            let index = searchFull.indexOf(searchString);

            if (index !== -1) {

                let foundPart1 = fullString.slice(0, index);
                let foundPart = searchString;
                let foundPart2 = fullString.slice(index + searchString.length, fullString.length);

                fill(255);
                textSize(50);

                let x1 = startX;
                let x2 = startX + textWidth(foundPart1);
                let x3 = startX + textWidth(foundPart1) + textWidth(foundPart);


                text(foundPart1, x1, y);

                whisperFont(foundPart, x2, y, 50);

                text(foundPart2, x3, y);


            } else {

                text(fullString, x, y);

            }

        } else {

            text(fullString, x, y);
        }
    }


    function whisperFont(foundPart, x2, y, size) {
        push();
        textSize(50);
        fill(255, 80);
        text(foundPart, x2, y);
        pop();
    }

    function whisper(fullString, x, y) {
        let startX = x
        if (typeof whisperSubtitles[whisperSubtitleIndex] !== "undefined") {

            let searchFull = fullString;
            let searchString = whisperSubtitles[whisperSubtitleIndex].text;
            let index = searchFull.indexOf(searchString);
            //
            if (index !== -1) {

                let foundPart1 = fullString.slice(0, index);
                let foundPart = searchString;
                let foundPart2 = fullString.slice(index + searchString.length, fullString.length);

                fill(255);
                textSize(50);

                let x1 = startX;
                let x2 = startX + textWidth(foundPart1);
                let x3 = startX + textWidth(foundPart1) + textWidth(foundPart);


                text(foundPart1, x1, y);

                whisperFont(foundPart, x2, y, 40);


                textSize(50);
                text(foundPart2, x3, y);


            } else {
                textSize(50);

                text(fullString, x, y);

            }
            //
        } else {
            textSize(50);

            text(fullString, x, y);
        }
    }

    function produceFont() {
     
        for (let i = 0; i < emphsiseSubtitles.length; i++) {

            if (emphsiseSubtitles[i].startTime < currentVideoTime && currentVideoTime < emphsiseSubtitles[i].endTime) {
                emphsiseSubtitleIndex = i;
            }

        }

        for (let i = 0; i < shoutSubtitles.length; i++) {

            if (shoutSubtitles[i].startTime < currentVideoTime && currentVideoTime < shoutSubtitles[i].endTime) {

                shoutSubtitleIndex = i;
            }

        }
        for (let i = 0; i < whisperSubtitles.length; i++) {

            if (whisperSubtitles[i].startTime < currentVideoTime && currentVideoTime < whisperSubtitles[i].endTime) {

                whisperSubtitleIndex = i;
            }

        }


        for (let i = 0; i < subtitles.length; i++) {

            if (currentVideoTime > subtitles[i].startTime && currentVideoTime <= subtitles[i].endTime
            ) {

                textSize(50);
                let fullString = subtitles[i].text.split("\n");


                if (typeof emphsiseSubtitles[emphsiseSubtitleIndex] !== "undefined") {

                    let searchFull = fullString[0];
                    let searchString = emphsiseSubtitles[emphsiseSubtitleIndex].text;
                    let index = searchFull.indexOf(searchString);

                    if (index !== -1) {

                        let foundPart1 = fullString[0].slice(0, index);
                        let foundPart = searchString;
                        let foundPart2 = fullString[0].slice(index + searchString.length, fullString[0].length);

                        fill(255);
                        textSize(50);
                        let startX = width / 2 - textWidth(searchFull) / 2
                        let x1 = startX;
                        let x2 = startX + textWidth(foundPart1);
                        let x3 = startX + textWidth(foundPart1) + textWidth(foundPart);

                        let y = height / 2 + 300;
                        shout(foundPart1, x1, y);


                        push();
                        textSize(50);
                        textStyle(BOLD);
                        fill(255);
                        text(foundPart, x2, y);
                        pop();


                        shout(foundPart2, x3, y);


                    } else {
                        let startX = width / 2 - textWidth(fullString[0]) / 2;
                 
                        shout(fullString[0], startX, height / 2 + 300 - 5);
                    }


                    if (typeof fullString[1] !== "undefined") {
                        let searchFull = fullString[1];
                        let searchString = emphsiseSubtitles[emphsiseSubtitleIndex].text;
                        let index = searchFull.indexOf(searchString);

                        if (index !== -1) {

                            let foundPart1 = searchFull.slice(0, index);
                            let foundPart = searchString;

                            let foundPart2 = searchFull.slice(index + searchString.length, searchFull.length);

                            fill(255);
                            textSize(50);
                            let startX = width / 2 - textWidth(searchFull) / 2
                            let x1 = startX;
                            let x2 = startX + textWidth(foundPart1);
                            let x3 = startX + textWidth(foundPart1) + textWidth(foundPart);

                            let y = height / 2 + 350;
                    
                            shout(foundPart1, startX, height / 2 + 350);


                            push();
                            textSize(50);
                            textStyle(BOLD);
                            fill(255);
                            text(foundPart, x2, y);
                            pop();

                            shout(foundPart2, x3, y);


                        } else {
                            let startX = width / 2 - textWidth(searchFull) / 2;

                            shout(searchFull, startX, height / 2 + 350);

                        }
                    }
                } else {
                    let startX = width / 2 - textWidth(fullString[0]) / 2;

                    shout(fullString[0], startX, height / 2 + 300 - 5);
                    if (typeof fullString[1] !== "undefined") {
                        startX = width / 2 - textWidth(fullString[1]) / 2;

                        shout(fullString[1], startX, height / 2 + 350);
                    }
                }


            }
        }


        // 获取视频的当前播放时间
        currentVideoTime = video.time();


    }

    function draw() {


        background(0);
        push();
        translate(0, -50);
        image(video, 0, 0, width, height);
        pop();

        currentVideoTime = video.time();


        //生成字幕
        produceFont();


    }

    function pauseVideo() {
        video.pause();
    }

    function startVideo() {

        video.loop(); // 播放视频
        let fsElement = document.documentElement; // 获取文档的根元素
        if (fsElement.requestFullscreen) {
            fsElement.requestFullscreen(); // 请求全屏
        } else if (fsElement.mozRequestFullScreen) {
            fsElement.mozRequestFullScreen(); // Firefox
        } else if (fsElement.webkitRequestFullscreen) {
            fsElement.webkitRequestFullscreen(); // Chrome, Safari, and Opera
        } else if (fsElement.msRequestFullscreen) {
            fsElement.msRequestFullscreen(); // IE/Edge
        }
    }
