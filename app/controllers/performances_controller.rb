class PerformancesController < ApplicationController

  def create
    performance = Performance.create!(performance_params)
    render json: performance, status: :created
  end

  def destroy
    byebug
    performance = Performance.find(params[:id])
    if User.find(session[:id]).is_admin
      performance.destroy
      head :no_content
    else
      return render json: { error: 'You must be an administrator to delete performances.' }, status: :unauthorized
    end
  end

  private
  def performance_params
    params.permit(:id, :piece_id, :ensemble_id, :concert_id)
  end

end
