import React from 'react';
import styled from 'styled-components';
import { GithubContext } from '../context/context';
import { ExampleChart, Pie3D, Column3D, Bar3D, Doughnut2D } from './Charts';
const Repos = () => {
  const { Repos } = React.useContext(GithubContext)
  
  const language = Repos.reduce((total, item) => {
    const { language, stargazers_count } = item
    // console.log(language)
    if (!language) return total
    // here, if the language is not there, return the object.
    if (!total[language]) {
    
      // total[language] = 1
      total[language] = { label: language, value: 1, stars: stargazers_count }
      // here we get the star count for each repo
      
      // this implies that if total[language] has no values, then we need to assign 
      // 1 to it.total[language] means total[javascript]
      // it runs the look by first encountering css and seeting its value to 1
      // it then comes back to set any other langeuage that it encounters in the second iteration
      // if it encounters a language the second time, it add 1 to its previos value
    }
    else {
      // total[language] = total[language] +1
      total[language] = {
        ...total[language],
        stars: total[language].stars + stargazers_count,
        // we will add  to stargazers_count if  there exist more than one language.
        value: total[language].value + 1
        // copy all the properties that the object has already but overwrite the value property
      }
      // here if it encounters a language for the second time in the loop, it adds 1 to the
      // value of the language it encountered.
    }
    
    // console.log(total)

    return total
  }, {})

  let mostUsed = Object.values(language).sort((a, b) => {
    return b.values-a.values
  }).slice(0, 5)
  // console.log(mostUsed)
  // console.log(language)
  let mostPopular = Object.values(language).sort((a, b) => {
    return b.stars-a.stars
  }).map((item) => {
    return {...item, value:item.stars}
  }).slice(0, 5)
  // console.log(mostPopular)


  let { stars, forks } = Repos.reduce((total, item) => { 
    const { stargazers_count, name, forks } = item
    total.stars[stargazers_count] =
      { label: name, value: stargazers_count }
    total.forks[forks] = {label:name, value:forks}
    // geting the stargazers count for each repo
    

     return total

  },
    // this is an object
    {
      stars: {}, forks: {}
      
    
    })
  stars = Object.values(stars).slice(0, 5).reverse()
  forks = Object.values(forks).slice(-5).reverse()

  // console.log(stars)
  
    
  // console.log(Repos)
  const chartData = [
  {
    label: "Html",
    value: "13",
  },
  {
    label: "Css",
    value: "23",
  },
  {
    label: "Javascript",
    value: "80",
  },

];
  return (
    <section className="section">
      <Wrapper className="section-center">
        <Pie3D data={mostUsed}></Pie3D>
        <Column3D data={stars}></Column3D>
        <Doughnut2D data={mostPopular}></Doughnut2D>
        <Bar3D data ={forks}></Bar3D>
        {/* <ExampleChart data={chartData}/> */}
      </Wrapper>
    </section>
  );
  
  
  
};

const Wrapper = styled.div`
  display: grid;
  justify-items: center;
  gap: 2rem;
  @media (min-width: 800px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: 1200px) {
    grid-template-columns: 2fr 3fr;
  }

  div {
    width: 100% !important;
  }
  .fusioncharts-container {
    width: 100% !important;
  }
  svg {
    width: 100% !important;
    border-radius: var(--radius) !important;
  }
`;

export default Repos;
