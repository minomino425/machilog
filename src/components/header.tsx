import React from 'react';

type shopInfoType = {
    shop_name: string | null;
};

    const Header = ({ shop_name }: shopInfoType) => {
        return (
          <div className="bg-orange-300">
            <h1>{shop_name}</h1>
          </div>
        );
      }

export default Header;
