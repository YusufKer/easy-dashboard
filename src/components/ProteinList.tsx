import ListPage from "@/components/ListPage";

export default function ProteinList() {
  return (
    <ListPage
      endpoint="protein"
      title="Proteins"
      resourceName="protein"
      detailPathTemplate="/protein/:id"
    />
  );
}
