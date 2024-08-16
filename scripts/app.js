const app = Vue.createApp({
    data() {
        return {
            studentID: 1159463,
            generalFacts: '',
            city: 'London',  // Default city
            weather: {
                temperature: '',
                wind: '',
                description: ''
            },
            definition: {
                word: '',
                phonetic: '',
                partOfSpeech: '',
                definition: ''
            }
        };
    },
    methods: {
        bringNewFacts() {
            fetch(`https://uselessfacts.jsph.pl/api/v2/facts/random`)
                .then(response => {
                    return response.json()
                })
                .then(data => {
                    this.generalFacts = data.text;
                })
                .catch(error => {
                    console.error('Error fetching random fact: ', error);
                });
            },
        weatherReport() {
            fetch(`https://goweather.herokuapp.com/weather/${encodeURIComponent(this.city)}`)
            
                .then(response => {
                    return response.json()
                })
                .then(data => {
                    this.weather.temperature = data.temperature;
                    this.weather.wind = data.wind;
                    this.weather.description = data.description;
                })
                .catch(error => {
                    console.error('Error:', error);
                });
            },
        wordMeaning() {
            fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(this.word)}`)
            //fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/Bottle}`)
                .then(response => {
                    return response.json()
                })
                .then(data => {
                    const wordData = data[0];
                    this.definition.word = wordData.word;
                    this.definition.phonetic = wordData.phonetic;
                    this.definition.partOfSpeech = wordData.meanings[0].partOfSpeech;
                    this.definition.definition = wordData.meanings[0].definitions[0].definition;
                })
                .catch(error => {
                    console.error('Error', error);
                });
            }

        },
        mounted() {
            this.bringNewFacts();  // Load a random fact on page load
            this.weatherReport();   // Loading weather for London, Ontario on page load as default
        }
});
app.mount('#app');
