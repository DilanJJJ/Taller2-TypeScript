import { series } from './data.js'; 
import { Serie } from './serie.js';  



const seriesTbody: HTMLElement = document.getElementById('series-table')!;


const seriesCard: HTMLElement = document.getElementById('series-card')!;
const seriesTitle: HTMLElement = document.getElementById('series-title')!;
const seriesDescription: HTMLElement = document.getElementById('series-description')!;
const seriesImage: HTMLImageElement = document.getElementById('series-image') as HTMLImageElement;
const seriesLink: HTMLAnchorElement = document.getElementById('series-link') as HTMLAnchorElement;

function renderSeriesInTable(series: Serie[]): void {
  let totalSeasons = 0;

 
  series.forEach(s => {
    let trElement = document.createElement("tr");
    trElement.innerHTML = `<td>${s.id}</td>
                           <td class="series-name" data-id="${s.id}">${s.name}</td>  
                           <td>${s.channel}</td>
                           <td>${s.seasons}</td>`;
    seriesTbody.appendChild(trElement);
    totalSeasons += s.seasons;  
  });


  const seasonsAverage = totalSeasons / series.length;

 
  let averageElement = document.createElement("tr");
  averageElement.innerHTML = `<td colspan="4" class="text-center"><strong>Seasons average: ${seasonsAverage.toFixed(2)}</strong></td>`;
  

  seriesTbody.appendChild(averageElement);

  const seriesNameElements = document.querySelectorAll('.series-name');
  seriesNameElements.forEach(element => {
    element.addEventListener('click', (event) => {
      const target = event.target as HTMLElement;
      const seriesId = parseInt(target.getAttribute('data-id')!);
      const selectedSeries = findSeriesById(series, seriesId);  
      if (selectedSeries) {
        displaySeriesDetails(selectedSeries);
      }
    });
  });
}


function findSeriesById(series: Serie[], id: number): Serie | undefined {
  for (let i = 0; i < series.length; i++) {
    if (series[i].id === id) {
      return series[i];
    }
  }
  return undefined;
}

function displaySeriesDetails(serie: Serie) {

  seriesCard.style.display = "block";
  seriesTitle.textContent = serie.name;
  seriesDescription.textContent = serie.description;
  seriesImage.src = serie.image;
  seriesLink.href = serie.webpage;
}


renderSeriesInTable(series);