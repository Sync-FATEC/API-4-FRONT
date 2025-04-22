import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import logo from '../../../src/static/img/tecsus-logo.png';
import './LandingPage.css';
import pluviometro from '../../../src/static/img/equipamentos/pluviometro.png';
import anemometro from '../../../src/static/img/equipamentos/anemometro.png';
import barometro from '../../../src/static/img/equipamentos/barometro.png';
import piranometro from '../../../src/static/img/equipamentos/piranometro.png';
import higrometro from '../../../src/static/img/equipamentos/higrometro.png';
import termometro from '../../../src/static/img/equipamentos/termometro.png';
import ButtonWithImg from '../../components/buttonWithImg/buttonWithImg';

export default function LandingPage() {
  return (
    <main className="LandingPage">
      <header className="LandingPageHeader">
        <div className="headerContent">
          <img src={logo} alt="Logo Tecsus" className="LogoTecsus" />
          <div className="navBar">
            <nav><a href="#Pluviômetro">Pluviômetro</a></nav>
            <nav><a href="#Termômetro">Termômetro</a></nav>
            <nav><a href="#Anemômetro">Anemômetro</a></nav>
            <nav><a href="#Barômetro">Barômetro</a></nav>
            <nav><a href="#Piranômetro">Piranômetro</a></nav>
            <nav><a href="#Higrômetro">Higrômetro</a></nav>
          </div>
          <ButtonWithImg style={1} icon={faArrowUpRightFromSquare} text="Login" link="/login" />
        </div>
        <h1>Instrumentos Meteorológicos</h1>
        <p>Esta base de conhecimento reúne informações detalhadas sobre os principais dispositivos utilizados no monitoramento do clima.</p>
      </header>

      <section className="LandingPageContent">
        {/* Pluviômetro */}
        <div className="contentMeteorologico" id="Pluviômetro">
          <div>
            <h2>Pluviômetro</h2>
            <p>O pluviômetro é uma ferramenta essencial para quantificar a chuva que cai em uma área específica. Ele registra a precipitação em milímetros, sendo que cada milímetro reflete a altura da água que se acumularia em uma superfície plana, equivalente a 1 litro por metro quadrado. Um modelo bastante utilizado é o de balde basculante: a chuva enche um pequeno recipiente que, ao atingir um limite, tomba e esvazia, enviando um sinal elétrico. Cada tombo geralmente equivale a 0,1 ou 0,2 mm, dependendo do ajuste do equipamento. A soma desses sinais revela o total de chuva. Por exemplo, se o aparelho registra 50 tombos e cada um vale 0,2 mm, a precipitação total é de 10 mm.</p>
            <p className="formula">Fórmula: P = N × C</p>
            <ul className="list">
              <li>P: Precipitação total acumulada (mm)</li>
              <li>N: Número de tombos registrados</li>
              <li>C: Calibração do pluviômetro (mm por tombo)</li>
            </ul>
          </div>
          <img src={pluviometro} alt="imagem de um pluviômetro" />
        </div>

        {/* Termômetro */}
        <div className="contentMeteorologico" id="Termômetro">
          <div>
            <h2>Termômetro</h2>
            <p>O termômetro serve para captar a temperatura de um ambiente ou objeto, indicando o quanto as partículas estão vibrando em um material. Há modelos tradicionais, como os de líquido (mercúrio ou álcool), e modernos, como os digitais, que usam sensores eletrônicos. Um sensor comum é o termopar, formado por dois metais diferentes que geram uma voltagem minúscula proporcional à temperatura. Essa voltagem é convertida em graus Celsius ou Fahrenheit por um circuito. Por exemplo, em um dia frio, o termômetro pode mostrar 5°C, ajudando a entender as condições externas ou internas.</p>
            <p className="formula">Fórmula: T = a + bR</p>
            <ul className="list">
              <li>T: Temperatura medida (°C)</li>
              <li>a: Constante de ajuste</li>
              <li>b: Coeficiente de temperatura</li>
              <li>R: Resistência elétrica do sensor (Ω)</li>
            </ul>
          </div>
          <img src={termometro} alt="imagem de um termômetro" />
        </div>

        {/* Anemômetro */}
        <div className="contentMeteorologico" id="Anemômetro">
          <div>
            <h2>Anemômetro</h2>
            <p>O anemômetro mede o movimento do vento, captando sua velocidade e, em alguns casos, sua direção. O tipo mais conhecido tem copos giratórios: o vento os faz rodar, e a velocidade das rotações é traduzida em metros por segundo ou quilômetros por hora. Um anemômetro simples pode girar 100 vezes em 10 segundos, indicando, após cálculo com uma constante própria do modelo, um vento de 15 m/s. Esse dado é valioso para aviação, agricultura e alertas de ventos fortes.</p>
            <p className="formula">Fórmula: V = (N × C) / t</p>
            <ul className="list">
              <li>V: Velocidade do vento (m/s)</li>
              <li>N: Número de rotações dos copos</li>
              <li>C: Constante de calibração</li>
              <li>t: Tempo de medição (s)</li>
            </ul>
          </div>
          <img src={anemometro} alt="imagem de um anemômetro" />
        </div>

        {/* Barômetro */}
        <div className="contentMeteorologico" id="Barômetro">
          <div>
            <h2>Barômetro</h2>
            <p>O barômetro é o instrumento que revela a pressão do ar ao nosso redor, um dado crucial para prever o tempo. Ele pode ser de mercúrio, com uma coluna de líquido que sobe ou desce conforme a pressão, ou digital, usando sensores eletrônicos. A pressão atmosférica cai com a altitude: no topo de uma montanha, o ar é mais rarefeito, e o barômetro mostra valores menores, como 900 hPa, contra 1013 hPa ao nível do mar. Essa variação ajuda meteorologistas a identificar frentes frias ou tempestades se aproximando.</p>
            <p className="formula">Fórmula: P = P₀ × e⁻ᵐᵍʰ/ʳᵀ</p>
            <ul className="list">
              <li>P: Pressão no ponto considerado (Pa)</li>
              <li>P₀: Pressão ao nível do mar (Pa)</li>
              <li>M: Massa molar do ar (kg/mol)</li>
              <li>g: Aceleração gravitacional (m/s²)</li>
              <li>h: Altitude acima do nível do mar (m)</li>
              <li>R: Constante dos gases (J/mol·K)</li>
              <li>T: Temperatura absoluta (K)</li>
            </ul>
          </div>
          <img src={barometro} alt="imagem de um barômetro" />
        </div>

        {/* Piranômetro */}
        <div className="contentMeteorologico" id="Piranômetro">
          <div>
            <h2>Piranômetro</h2>
            <p>O piranômetro registra a energia do sol que chega à Terra, medindo a radiação em watts por metro quadrado. Ele tem uma superfície sensível que capta tanto a luz direta do sol quanto a espalhada pelo céu. Em um dia claro, pode indicar 800 W/m², enquanto em um dia nublado, talvez apenas 200 W/m². Esses números são usados em estudos climáticos, eficiência de painéis solares e até na agricultura, para entender como as plantas recebem luz.</p>
            <p className="formula">Fórmula: R = E / A</p>
            <ul className="list">
              <li>R: Radiação total incidente (W/m²)</li>
              <li>E: Energia total medida pelo piranômetro (W)</li>
              <li>A: Área da superfície do sensor (m²)</li>
            </ul>
          </div>
          <img src={piranometro} alt="imagem de um piranômetro" />
        </div>

        {/* Higrômetro */}
        <div className="contentMeteorologico" id="Higrômetro">
          <div>
            <h2>Higrômetro</h2>
            <p>O higrômetro avalia a umidade do ar, mostrando quanto vapor d'água está presente em relação ao máximo que o ar suporta antes de condensar. Ele pode ser mecânico, com materiais que se expandem ao absorver umidade, ou eletrônico, com sensores que detectam mudanças na capacitância. Em um dia úmido, o higrômetro pode indicar 80%, sugerindo que o ar está quase saturado. Esse valor influencia o conforto humano e previsões de chuva ou nevoeiro.</p>
            <p className="formula">Fórmula: UR = (e / es) × 100</p>
            <ul className="list">
              <li>UR: Umidade relativa do ar (%)</li>
              <li>e: Pressão de vapor atual do ar (hPa)</li>
              <li>es: Pressão de vapor de saturação (hPa)</li>
            </ul>
          </div>
          <img src={higrometro} alt="imagem de um higrômetro" />
        </div>
      </section>
    </main>
    );      
}