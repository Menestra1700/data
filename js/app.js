
$(document).ready(function () {
    console.log("JavaScript cargado correctamente"); // Para verificar que funciona

    
    $("#lista-peliculas").html(`
        <div class="col-12 text-center">
            <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Cargando...</span>
            </div>
            <p class="mt-2">Cargando películas, espera 5 segundos...</p>
        </div>
    `);

    
    setTimeout(function() {
        $.ajax({
            url: "data/peliculas.json",
            method: "GET",
            dataType: "json",
            success: function (peliculas) {
                console.log("Películas cargadas:", peliculas); 
                
                let html = "";
                
                peliculas.forEach(function (peli) {
                    const hoy = new Date();
                    const fechaEstreno = new Date(peli.estreno);
                    
                    let precio;
                    let estado;
                    let badgeClass;
                    
                    if (hoy < fechaEstreno) {
                        precio = peli.precios.estreno;
                        estado = "🎬 ESTRENO";
                        badgeClass = "bg-danger";
                    } else {
                        precio = peli.precios.normal;
                        estado = "📽️ CARTELERA REGULAR";
                        badgeClass = "bg-secondary";
                    }
                    
                    html += `
                        <div class="col-md-4 mb-4" style="display: none;">
                            <div class="card h-100 shadow">
                                <img src="img/${peli.imagen}" class="card-img-top" alt="${peli.titulo}" onerror="this.src='https://via.placeholder.com/300x450?text=Imagen+no+disponible'">
                                <div class="card-body">
                                    <h5 class="card-title">${peli.titulo}</h5>
                                    <p class="card-text">${peli.generos.join(" • ")}</p>
                                    <p><span class="badge ${badgeClass}">${estado}</span></p>
                                    <p><strong>Precio: $${precio}</strong></p>
                                    <a href="pages/detalle.html?id=${peli.id}" class="btn btn-primary">Ver más</a>
                                </div>
                            </div>
                        </div>
                    `;
                });
                
                $("#lista-peliculas").html(html);

                $("#lista-peliculas .col-md-4").fadeIn(800);
            },
            error: function (xhr, status, error) {
                console.error("Error AJAX:", error);
                $("#lista-peliculas").html(`
                    <div class="col-12">
                        <div class="alert alert-danger text-center">
                            ❌ No se pudo cargar la lista de películas.<br>
                            Error: ${error}
                        </div>
                    </div>
                `);
            }
        });
    }, 5000); 

    if (!localStorage.getItem("bienvenido")) {
        setTimeout(() => {
            alert("🎬 ¡Bienvenido a CineApp! Disfruta de nuestras películas.");
            localStorage.setItem("bienvenido", "true");
        }, 1000);
    }
});