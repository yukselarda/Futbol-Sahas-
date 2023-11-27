
let kaleBir = $("#kale_bir");
let kaleIki = $("#kale_iki");
let saha = $("#saha");  // Added line to select the #saha element
console.log(saha.position());
console.log(saha.width());
let skor = 0;
let skor_Iki = 0;

$(document).keydown(function (event) {
    var fut = $("#futbol_topu");
    var greenDiv = $("#saha");
    var y = fut.position().top;
    var x = fut.position().left;
    var step = 35;

    if (event.keyCode == 37) {
        fut.css("left", Math.max(0, x - step) + "px");
    }
    else if (event.keyCode == 38) {
        fut.css("top", Math.max(0, y - step) + "px");
    }
    else if (event.keyCode == 39) {
        console.log($("#saha").position().left + $("#saha").width())
 
        if ((x + $("#saha").position().left) < ($("#saha").position().left + $("#saha").width())){
            fut.style.left = Math.max(100, x + step) + "px";
        }
    }
    else if (event.keyCode == 40) {
        fut.style.top = Math.min($(saha).height() + $(saha).position().top, y + step) + "px";
    }


    var futPosition = fut.position();
    var kaleBirPosition = kaleBir.position();

    // bottom ve right değerlerini hesapla
    var futBottom = futPosition.top + fut.outerHeight();
    var futRight = futPosition.left + fut.outerWidth() - 10;

    var kaleBirBottom = kaleBirPosition.top + kaleBir.outerHeight();
    var kaleBirRight = kaleBirPosition.left + kaleBir.outerWidth() - 10;

    // İki div'in kesişip kesişmediğini kontrol et
    if (
        futPosition.top <= kaleBirBottom &&
        futBottom >= kaleBirPosition.top &&
        futPosition.left <= kaleBirRight &&
        futRight >= kaleBirPosition.left
    ) {
        skor = skor + 1;
        console.log(skor)
        document.getElementById("skor_takim_iki").innerText = skor;

        ortalaElement("#futbol_topu");
        calMuzik();
    }


    var futPosition = fut.position();
    var kaleIkiPosition = kaleIki.position();

    // bottom ve right değerlerini hesapla
    var futBottom = futPosition.top + fut.outerHeight();
    var futRight = futPosition.left + fut.outerWidth();

    var kaleIkiBottom = kaleIkiPosition.top + kaleIki.outerHeight();
    var kaleIkiRight = kaleIkiPosition.left + kaleIki.outerWidth();

    // İki div'in kesişip kesişmediğini kontrol et
    if (
        futPosition.top <= kaleIkiBottom &&
        futBottom >= kaleIkiPosition.top &&
        futPosition.left <= kaleIkiRight &&
        futRight >= kaleIkiPosition.left
    ) {
        skor_Iki = skor_Iki + 1;
        console.log(skor_Iki)
        document.getElementById("skor_takim_bir").innerText = skor_Iki;

        ortalaElement("#futbol_topu");
        calMuzik();
    }

});


function ortalaElement(elementId) {
    var element = $(elementId);
    var genislik = $(window).width();
    var yukseklik = $(window).height();

    var elementGenislik = element.width();
    var elementYukseklik = element.height();

    var yeniLeft = (genislik - elementGenislik) / 2;
    var yeniTop = (yukseklik - elementYukseklik) / 2;

    element.css({
        position: "absolute",
        left: yeniLeft + "px",
        top: yeniTop + "px"
    });
}

function calMuzik() {
    var audio = new Audio('img/Ercan Taner Allahım gol SESİ 2021.mp3');
    audio.play();
}
var counterValue = 50; // Saniye cinsinden süreyi buradan ayarlayabilirsiniz
var counterElement = document.getElementById("counter");
var interactionAllowed = true; // Kullanıcının etkileşimine izin veren bayrak

function countdown() {
    counterElement.innerText = counterValue;

    if (counterValue > 0) {
        counterValue--;

        if (interactionAllowed) {
            setTimeout(countdown, 1000);
        }
    } else {
        // Süre sıfır olduğunda SweetAlert2 ile pop-up göster
        showPopup();
    }
}

function showPopup() {
    // Kullanıcının etkileşimine izin veren bayrağı kapat
    interactionAllowed = false;

    // SweetAlert2 pop-up göster
    Swal.fire({
        title: 'Süre doldu!',
        icon: 'info',
        html: '<audio class="none"; controls autoplay><source src="img/Mackolik.mp3" type="audio/mp3"></audio>',
        confirmButtonText: 'Süre doldu! Maça Tekrardan başlayın.',
        allowOutsideClick: false, // Pop-up dışında tıklamalara izin verme
    }).then((result) => {
        if (result.isConfirmed) {
            // Sayfayı yeniden başlat
            restartPage();
        }
    });
}

window.onload = countdown;

// Sayfayı yeniden başlatan fonksiyon
function restartPage() {
    window.location.reload();
}

