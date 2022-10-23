import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Chart } from "react-google-charts"; 

export default function Encurtador(){
    const history = useHistory();

    const [chartData, setChartData] = useState([["Link", "Cliques"]]);

    useEffect(() => {
        const copiaChartData = chartData;
        const meusLinks = [
            {id: '1', titulo: 'link 1', contadorCliques: 12,},
            {id: '2', titulo: 'link 2', contadorCliques: 0,},
            {id: '3', titulo: 'link 3', contadorCliques: 1,},
            {id: '4', titulo: 'link 4', contadorCliques: 7,},
            {id: '5', titulo: 'link 5', contadorCliques: 6,},
            {id: '6', titulo: 'link 6', contadorCliques: 7,},
            {id: '7', titulo: 'link 7', contadorCliques: 10,},
            {id: '8', titulo: 'link 8', contadorCliques: 1,},
            {id: '9', titulo: 'link 9', contadorCliques: 3,},
            {id: '10', titulo: 'link 10', contadorCliques: 4},
            {id: '11', titulo: 'link 11', contadorCliques: 12},
            {id: '12', titulo: 'link 12', contadorCliques: 11},
            {id: '13', titulo: 'link 13', contadorCliques: 9}
        ];
        
        if(chartData.length === 1){
            const linksOrdenadosDecrescente = meusLinks.sort((a, b) => {
                return a.contadorCliques > b.contadorCliques ? -1 : a.contadorCliques < b.contadorCliques ? 1 : 0;
            });

            if(meusLinks.length > 9){
                linksOrdenadosDecrescente.slice(0, 8).forEach((link) => copiaChartData.push([link.titulo, link.contadorCliques]))
                const result = linksOrdenadosDecrescente.slice(9).reduce(somaCliques,0);
                copiaChartData.push(["Outros", result]);
            }else{
                meusLinks.forEach((link) => {
                    copiaChartData.push([link.titulo, link.contadorCliques])
                });
            }

            setChartData(copiaChartData);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <div>
                <h1>Analytics</h1>
                <button onClick={() => history.push("/login")}>Login</button>
                <button onClick={() => history.push("/perfil")}>Perfil</button>
                <button onClick={() => history.push("/cadastro")}>Cadastro</button>
                <button onClick={() => history.push("/analytics")}>Analytics</button>
                <button onClick={() => history.push("/")}>Encurtador</button>
            </div>
            <div>
                <Chart
                    chartType="PieChart"
                    data={chartData}
                    width={"100%"}
                    height={"400px"}
                />
            </div>
        </>
    )
}

function somaCliques(total, link){
    return total + link.contadorCliques;
}