
function translate() {
    var fromLang = $("#selFrom").val();
    var toLang = $("#selTo").val();
    var text = $("#inputTa").val();
    text = text.replace(/(\r\n|\n|\r)/gm,"");
    var params = [{
        "jsonrpc": "2.0",
        "method": "LMT_handle_jobs",
        "params": {
            "jobs": [
                {
                    "kind":"default",
                    "raw_en_sentence": text
                }
            ],
            "lang": {
                "user_preferred_langs": [
                    fromLang,
                    toLang
                ],
                "source_lang_user_selected": fromLang,
                "target_lang": toLang
            },
            "priority": "-1",
        }
    }];

    $.ajax({
        url : "https://www.deepl.com/jsonrpc",
        type: "POST",
        data: JSON.stringify(params),
        contentType: "application/json; charset=utf-8",
        dataType   : "json",
        success    : function(data) {
            $("#resultTa").val(data[0]["result"]["translations"]["0"]["beams"][0]["postprocessed_sentence"]);
        },
        error   : function(data) {
            throw "Es ist ein Fehler aufgetreten."
        }
    });
}

window.onload=function () {
    document.getElementById('btnTrans').addEventListener('click',translate);
}