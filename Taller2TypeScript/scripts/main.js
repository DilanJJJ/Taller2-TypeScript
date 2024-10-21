import { series } from './data.js';
var seriesTbody = document.getElementById('series-table');
var seriesCard = document.getElementById('series-card');
var seriesTitle = document.getElementById('series-title');
var seriesDescription = document.getElementById('series-description');
var seriesImage = document.getElementById('series-image');
var seriesLink = document.getElementById('series-link');
function renderSeriesInTable(series) {
    var totalSeasons = 0;
    series.forEach(function (s) {
        var trElement = document.createElement("tr");
        trElement.innerHTML = "<td>".concat(s.id, "</td>\n                           <td class=\"series-name\" data-id=\"").concat(s.id, "\">").concat(s.name, "</td>  \n                           <td>").concat(s.channel, "</td>\n                           <td>").concat(s.seasons, "</td>");
        seriesTbody.appendChild(trElement);
        totalSeasons += s.seasons;
    });
    var seasonsAverage = totalSeasons / series.length;
    var averageElement = document.createElement("tr");
    averageElement.innerHTML = "<td colspan=\"4\" class=\"text-center\"><strong>Seasons average: ".concat(seasonsAverage.toFixed(2), "</strong></td>");
    seriesTbody.appendChild(averageElement);
    var seriesNameElements = document.querySelectorAll('.series-name');
    seriesNameElements.forEach(function (element) {
        element.addEventListener('click', function (event) {
            var target = event.target;
            var seriesId = parseInt(target.getAttribute('data-id'));
            var selectedSeries = findSeriesById(series, seriesId);
            if (selectedSeries) {
                displaySeriesDetails(selectedSeries);
            }
        });
    });
}
function findSeriesById(series, id) {
    for (var i = 0; i < series.length; i++) {
        if (series[i].id === id) {
            return series[i];
        }
    }
    return undefined;
}
function displaySeriesDetails(serie) {
    seriesCard.style.display = "block";
    seriesTitle.textContent = serie.name;
    seriesDescription.textContent = serie.description;
    seriesImage.src = serie.image;
    seriesLink.href = serie.webpage;
}
renderSeriesInTable(series);
