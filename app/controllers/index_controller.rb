class IndexController < ApplicationController

  def index
    @items = {
      :foo => "foo",
      :bar => "bar",
      :baz => "baz"
    }
  end

end
