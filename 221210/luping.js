(function (params) {
var bodyDom = document.querySelector("body");
var btnDom = document.createElement("div");
bodyDom.appendChild(btnDom);
btnDom.addEventListener("click", async function () {
    var stream = await navigator.mediaDevices.getDisplayMedia({
        video: true
    });
    const mime = MediaRecorder.isTypeSupported("video/webm; codecs=vp9")? "video/webm; codecs=vp9": "video/webm";
    var mediaRecorder = new MediaRecorder(stream, {mimeType: mime});
    var chunks = [];
    mediaRecorder.addEventListener("dataavailable", function (e) {chunks.push(e.data);});
    mediaRecorder.addEventListener("stop", function () {
        var blob = new Blob(chunks, {
            type: chunks[0].type
        });
        var url = URL.createObjectURL(blob);
        var a = document.createElement("a");
        a.href = url;
        a.download = new Date().getTime()+"video.webm";
        a.click();
    });
    mediaRecorder.start();
});
btnDom.click();
})()
