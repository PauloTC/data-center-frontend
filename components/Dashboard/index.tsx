"use client";
import React, { useEffect } from "react";
import "./styles.scss";
import classNames from "classnames";
import {
  libre_franklin600,
  libre_franklin500,
  libre_franklin700,
} from "@/app/fonts";

export default function DashboardComponent() {
  //Segundo Chart

  const labels = [
    "De 15.5 a 16.75",
    "De 14.25 a 15.5",
    "De 13 a 14.25",
    "De 11.75 a 13",
    "De 10.5 a 11.75",
    "De 9.25 a 10.5",
    "De 8 a 9.25",
    "De 6.75 a 8",
    "De 5.5 a 6.75",
    "De 4.25 a 5.5",
  ];

  const comments = [
    "Bolívar 750g, 1.5 kg",
    "Opal 750g, 1.5 kg",
    "Marsella 750g, 1.5 kg",
    "Sapolio 750g, 1.5 kg",
    "Marsella 8kg Sapolio 4 kg",
    "Opal 4.2 kg Sapolio 2kg",
  ];

  const dataY = ["0", "1 000 000", "2 000 000", "3 000 000"];

  const newData = {
    labels,
    datasets: [
      {
        label: "Bolivar",
        data: [400000, 500000, 400000, 0, 0, 0, 0, 400000, 900000, 100000],
        backgroundColor: "rgb(255, 99, 132)",
        company: "Alicorp",
      },
      {
        label: "Opal",
        data: [
          300000, 100000, 400000, 1200000, 200000, 0, 400000, 200000, 100000,
          100000,
        ],
        backgroundColor: "rgb(75, 192, 192)",
        company: "Alicorp",
      },
      {
        label: "Marsella",
        data: [
          100000, 300000, 200000, 900000, 300000, 100000, 200000, 0, 200000,
          100000,
        ],
        backgroundColor: "rgb(53, 162, 235)",
        company: "Alicorp",
      },
      {
        label: "Magia Blanca",
        data: [0, 0, 0, 100000, 500000, 400000, 800000, 700000, 600000, 900000],
        backgroundColor: "rgb(250 204 21)",
        company: "Competence",
      },
    ],
  };

  const dataValues = newData.datasets[0].data.map((_, i) =>
    newData.datasets.map((dataset) => ({
      value: dataset.data[i],
      backgroundColor: dataset.backgroundColor,
      brand: dataset.label,
    }))
  );

  function convertToPixels(value: any) {
    const pixels = (500 * value) / 3000000;
    return pixels;
  }

  return (
    <>
      <h4
        className={`${libre_franklin600.className} text-slate-700 capitalize text-3xl mb-6`}
      >
        Piano de precios
      </h4>
      <br />
      <div className="flex">
        <div className="flex flex-col items-end">
          <div className="flex">
            <ul className="flex flex-col items-end border-r-2 w-32 pr-2">
              {labels.map((label) => {
                return <li className="text-xs py-2">{label}</li>;
              })}
            </ul>
            <ul className="flex justify-around flex-col" style={{ width: 500 }}>
              {dataValues.map((data, index) => {
                const sum = data.reduce((total, d) => total + d.value, 0);

                console.log(sum);

                return (
                  <div className="flex items-center relative self-start  cursor-pointer">
                    <li
                      className="flex relative chart-bar"
                      style={{ width: convertToPixels(sum) }}
                    >
                      {data.map((d, index) => {
                        return (
                          <p
                            key={index}
                            className={classNames(
                              "text-xs",
                              "text-center",
                              "h-5",
                              "flex",
                              "items-center",
                              "justify-center",
                              {
                                "text-transparent": (d.value / sum) * 100 < 22,
                                "text-white": (d.value / sum) * 100 > 22,
                              }
                            )}
                            style={{
                              width: (d.value / sum) * 100 + "%",
                              backgroundColor: d.backgroundColor,
                            }}
                          >
                            {((d.value / sum) * 100).toFixed(0)}%
                          </p>
                        );
                      })}
                      <div
                        style={{ bottom: "-200%" }}
                        className="
                          absolute opacity-0 
                          pointer-events-none 
                          transition-all duration-100 
                          left-full bg-slate-800 
                          text-white ml-5 w-40 z-10 
                          rounded p-2"
                      >
                        {data.map((d, index) => {
                          return (
                            <li
                              key={index}
                              className={classNames(
                                "flex",
                                "text-xs",
                                "justify-between",
                                "mb-2",
                                {
                                  hidden: d.value === 0,
                                }
                              )}
                            >
                              <div className="flex gap-2">
                                <p
                                  className="h-3 w-3 rounded-full"
                                  style={{ backgroundColor: d.backgroundColor }}
                                ></p>
                                <p>{d.brand}:</p>
                              </div>
                              <p>{d.value.toLocaleString("en-US")}</p>
                            </li>
                          );
                        })}
                        <div className="flex justify-between mt-2">
                          <span className="text-xs">Total: </span>
                          <p className="text-xs">
                            {sum.toLocaleString("en-US")}
                          </p>
                        </div>
                      </div>
                    </li>

                    <span className="text-xs absolute pointer-events-none left-full d-block w-40 ml-6">
                      {comments[index]}
                    </span>
                  </div>
                );
              })}
            </ul>
          </div>
          <ul className="flex border-t-2 w-full justify-between pl-32 pt-2">
            {dataY.map((d) => {
              return <li className="text-xs">{d}</li>;
            })}
          </ul>
        </div>
        <div className="pl-12 flex gap-8">
          <div>
            <h4 className="font-bold mb-2">Alicorp</h4>
            <ul className="flex flex-col pb-8 pt-1 gap-2">
              {newData.datasets
                .filter((d) => d.company === "Alicorp")
                .map((d) => {
                  return (
                    <li className="text-xs flex gap-2">
                      <span
                        className="block h-4 w-4"
                        style={{ backgroundColor: d.backgroundColor }}
                      ></span>
                      <p>{d.label}</p>
                    </li>
                  );
                })}
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-2">Competencia</h4>
            <ul className="flex flex-col pb-8 pt-1 gap-2">
              {newData.datasets
                .filter((d) => d.company === "Competence")
                .map((d) => {
                  return (
                    <li className="text-xs flex gap-2">
                      <span
                        className="block h-4 w-4"
                        style={{ backgroundColor: d.backgroundColor }}
                      ></span>
                      <p>{d.label}</p>
                    </li>
                  );
                })}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
