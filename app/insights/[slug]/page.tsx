export default async function InsightDetailPage({ params }: any) {
  console.log(params);

  return <p>Detalle de un insight {params.slug}</p>;
}
