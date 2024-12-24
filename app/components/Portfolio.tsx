import { useState, useEffect } from "react";
import PortfolioModalForm from "./PortfolioModalForm";
import PortfolioAsset from "./PortfolioAsset";
import { useLocalStorage } from "@/utils/localStorage";
import { hoverEffect } from "@/utils/hoverEffect";

function Portfolio() {
  const [assets, setAssets] = useLocalStorage([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [idForEditing, setIdForEditing] = useState<any>();

  const findAsset = (id: any) => {
    return assets.find((asset: any) => asset.id === id);
  };

  const addAsset = (newAsset: any) => {
    const newAssets = [...assets, newAsset];
    setAssets(newAssets);
  };

  const removeAsset = (asset: any) => {
    setAssets((assets: any) => assets.filter((a: any) => a.id !== asset.id));
  };

  const handleUpdateAsset = (newAsset: any, id: any) => {
    const updatedTasks = assets?.map((asset: any) =>
      asset.id == id ? newAsset : asset
    );
    setAssets(updatedTasks);
  };

  useEffect(() => {
    if (isEditing) {
      setIsModalOpen(true);
    }
  }, [isEditing]);

  return (
    // page container
    <div className="p-14">
      <div className="flex justify-between mb-8">
        <div className="font-medium">Your statistics</div>
        <button
          onClick={() => {
            setIsModalOpen(!isModalOpen);
          }}
          className={`bg-black opacity-90 font-medium rounded-xl py-3 px-20 ${hoverEffect} `}
        >
          Add Assets
        </button>
      </div>

      {assets == "" ? (
        <div className="text-center font-medium">
          Your Portfolio is currently empty{" "}
        </div>
      ) : (
        ""
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className=" fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-slate-500 rounded-lg p-10 shadow-lg  w-6/12">
            <div className="flex justify-between gap-4 mb-4">
              <p className="font-medium">Select Coins</p>
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setIsEditing(false);
                }}
                className={` ${hoverEffect}text-xs border-2 border-slate-100 rounded-full px-3 py-1`}
              >
                X
              </button>
            </div>
            <PortfolioModalForm
              idForEditing={idForEditing}
              setIsModalOpen={setIsModalOpen}
              addAsset={addAsset}
              handleUpdateAsset={handleUpdateAsset}
              isEditing={isEditing}
              setIsEditing={setIsEditing}
              findAsset={findAsset}
            />
          </div>
        </div>
      )}

      {/* display assets  */}

      {assets?.map((asset: any) => (
        <PortfolioAsset
          setIdForEditing={setIdForEditing}
          setIsEditing={setIsEditing}
          removeAsset={removeAsset}
          key={asset.id}
          asset={asset}
        />
      ))}
    </div>
  );
}

export default Portfolio;
