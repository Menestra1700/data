$(document).ready(function () {

    console.log(" JS funcionando");

    $("#lista-peliculas").html(`
        <div class="col-12 text-center">
            <div class="spinner-border text-primary"></div>
            <p>Cargando películas...</p>
        </div>
    `);

    setTimeout(function() {

        $.ajax({
            url: "data/data/peliculas.json",
            method: "GET",
            dataType: "json",

            success: function (peliculas) {

                console.log(" JSON cargado", peliculas);

                let html = "";

                peliculas.forEach(function (peli) {

                    const hoy = new Date();
                    const fechaEstreno = new Date(peli.estreno);

                    let precio = hoy < fechaEstreno ? peli.precios.estreno : peli.precios.normal;
                    let estado = hoy < fechaEstreno ? "🎬 ESTRENO" : "📽️ CARTELERA";
                    let badge = hoy < fechaEstreno ? "bg-danger" : "bg-secondary";

                    html += `
                        <div class="col-md-4 mb-4" style="display:none;">
                            <div class="card shadow h-100">
                                <img src="${peli.imagen}" class="card-img-top"
                                     onerror="this.src='https://via.placeholder.com/300x450'">
                                <div class="card-body">
                                    <h5>${peli.titulo}</h5>
                                    <p>${peli.generos.join(" • ")}</p>
                                    <span class="badge ${badge}">${estado}</span>
                                    <p class="mt-2"><strong>$${precio}</strong></p>
                                    <button class="btn btn-danger ver-trailer mt-2"
                                        data-trailer="${peli.trailer}">
                                        ▶ Ver tráiler
                                    </button>
                                    <a href="pages/detalle.html?id=${peli.id}"
                                       class="btn btn-primary mt-2">
                                       Ver más
                                    </a>
                                </div>
                            </div>
                        </div>
                    `;
                });

                $("#lista-peliculas").html(html);
                $("#lista-peliculas .col-md-4").fadeIn(800);
            },

            error: function () {
                $("#lista-peliculas").html(`
                    <div class="alert alert-danger text-center">
                         Error cargando películas<br>
                        <small>Verifica: data/data/peliculas.json</small>
                    </div>
                `);
            }
        });

    }, 2000);

    $(document).on("click", ".ver-trailer", function () {
        const trailer = $(this).data("trailer");
        $("#videoTrailer").attr("src", trailer);
        new bootstrap.Modal(document.getElementById("modalTrailer")).show();
    });

    $('#modalTrailer').on('hidden.bs.modal', function () {
        $("#videoTrailer").attr("src", "");
    });

    if (!localStorage.getItem("bienvenido")) {
        setTimeout(() => {
            alert("🎬 ¡Bienvenido a CinePlus!");
            localStorage.setItem("bienvenido", "true");
        }, 1000);
    }

});